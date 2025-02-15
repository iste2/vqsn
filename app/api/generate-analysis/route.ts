import { NextRequest, NextResponse } from 'next/server'
import {adminDb} from "@/lib/firebase/admin-config";
import {getAllCompanies, getCompanyFilingHistoryByCik} from "@/lib/analysis/read-companies";
import {Company, CompanyAnalysis} from "@/lib/analysis/interfaces";
import {generateAnalysisForSingeCompany} from "@/lib/analysis/generate-analysis";
import {FieldValue} from "firebase-admin/firestore";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;
import {analysisCollectionName} from "@/lib/firebase/collection-names";

export const params = {
    key: "key",
    force: "force",
    numberOfCompanies: "numberOfCompanies"
}

export async function GET(request: NextRequest) {
    //#region authorization
    const validApiKey = process.env.GENERATE_ANALYSIS_KEY
    
    if (!validApiKey) {
        return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 }
        )
    }

    // Get the key from the URL params
    const key = request.nextUrl.searchParams.get(params.key);

    // Validate the key
    if (key !== validApiKey) {
        return NextResponse.json(
            { error: 'Invalid API key' },
            { status: 401 }
        )
    }
    //#endregion
    
    try {
        // get all companies
        const numberOfCompanies = request.nextUrl.searchParams.get(params.numberOfCompanies);
        let companies: Company[] = [];
        if(numberOfCompanies) {
            companies = (await getAllCompanies()).slice(0, parseInt(numberOfCompanies));
        } else {
            companies = await getAllCompanies();
        }
        console.log(companies);

        // analyze each company
        const force = request.nextUrl.searchParams.get(params.key) === 'true';
        const analyzedCompanies : CompanyAnalysis[] = [];
        for (const company of companies) {
            const lastFiling = (await getCompanyFilingHistoryByCik(company.cik))?.find(filing => filing.form === '10-K');
            if (!lastFiling) {
                continue;
            }
            if(!force) {
                const lastFilingTimestamp = Timestamp.fromDate(new Date(lastFiling.filingDate));
                const querySnapshot = await adminDb.collection(analysisCollectionName)
                    .where('company.cik', '==', company.cik)
                    .where('timestamp', '>', lastFilingTimestamp)
                    .limit(1)
                    .get();

                if(!querySnapshot.empty) {
                    console.log("Company analysis already up to date", company);
                    continue;
                }
            }
            
            const analysis = await generateAnalysisForSingeCompany(company);
            if (analysis) {
                analyzedCompanies.push(analysis);
            }
        }

        // write to firebase
        const analysisRef = adminDb.collection(analysisCollectionName);
        for (const analysis of analyzedCompanies) {
            await analysisRef.add({
                company: {
                    name: analysis.company.name,
                    cik: analysis.company.cik,
                    ticker: analysis.company.ticker,
                    exchange: analysis.company.exchange,
                },
                form10K: {
                    item1: analysis.form10K.item1,
                    item1a: analysis.form10K.item1a
                },
                summary: analysis.summary,
                characteristics: {
                    shortLifeCycleBrands: {
                        score: analysis.characteristics.shortLifeCycleBrands.score,
                        reasoning: analysis.characteristics.shortLifeCycleBrands.reasoning,
                        examples: analysis.characteristics.shortLifeCycleBrands.examples
                    },
                    essentialProducts: {
                        score: analysis.characteristics.essentialProducts.score,
                        reasoning: analysis.characteristics.essentialProducts.reasoning,
                        examples: analysis.characteristics.essentialProducts.examples
                    },
                    premiumProvider: {
                        score: analysis.characteristics.premiumProvider.score,
                        reasoning: analysis.characteristics.premiumProvider.reasoning,
                        examples: analysis.characteristics.premiumProvider.examples
                    },
                    regulationDriven: {
                        score: analysis.characteristics.regulationDriven.score,
                        reasoning: analysis.characteristics.regulationDriven.reasoning,
                        examples: analysis.characteristics.regulationDriven.examples
                    },
                    highScalability: {
                        score: analysis.characteristics.highScalability.score,
                        reasoning: analysis.characteristics.highScalability.reasoning,
                        examples: analysis.characteristics.highScalability.examples
                    },
                    costLeader: {
                        score: analysis.characteristics.costLeader.score,
                        reasoning: analysis.characteristics.costLeader.reasoning,
                        examples: analysis.characteristics.costLeader.examples
                    }
                },
                porterAnalysis: {
                    supplierPower: {
                        score: analysis.porterAnalysis.supplierPower.score,
                        reasoning: analysis.porterAnalysis.supplierPower.reasoning,
                        examples: analysis.porterAnalysis.supplierPower.examples
                    },
                    buyerPower: {
                        score: analysis.porterAnalysis.buyerPower.score,
                        reasoning: analysis.porterAnalysis.buyerPower.reasoning,
                        examples: analysis.porterAnalysis.buyerPower.examples
                    },
                    newEntrants: {
                        score: analysis.porterAnalysis.newEntrants.score,
                        reasoning: analysis.porterAnalysis.newEntrants.reasoning,
                        examples: analysis.porterAnalysis.newEntrants.examples
                    },
                    substitutes: {
                        score: analysis.porterAnalysis.substitutes.score,
                        reasoning: analysis.porterAnalysis.substitutes.reasoning,
                        examples: analysis.porterAnalysis.substitutes.examples
                    },
                    competitiveRivalry: {
                        score: analysis.porterAnalysis.competitiveRivalry.score,
                        reasoning: analysis.porterAnalysis.competitiveRivalry.reasoning,
                        examples: analysis.porterAnalysis.competitiveRivalry.examples
                    }
                },
                timestamp: FieldValue.serverTimestamp(),
            });
        }
        
        return NextResponse.json(analyzedCompanies.map(company => company.company));
    } catch (error: Error | any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}