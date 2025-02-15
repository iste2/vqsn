import { NextRequest, NextResponse } from 'next/server'
import {adminDb} from "@/lib/firebase/admin-config";
import {getAllCompanies} from "@/lib/analysis/read-companies";
import {CompanyAnalysis} from "@/lib/analysis/interfaces";
import {generateAnalysisForSingeCompany} from "@/lib/analysis/generate-analysis";
import {FieldValue} from "firebase-admin/firestore";

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
    const key = request.nextUrl.searchParams.get('key');

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
        const companies = (await getAllCompanies()).slice(0, 1);
        console.log(companies);

        // analyze each company
        const analyzedCompanies : CompanyAnalysis[] = [];
        for (const company of companies) {
            const analysis = await generateAnalysisForSingeCompany(company);
            if (analysis) {
                analyzedCompanies.push(analysis);
            }
        }

        // write to firebase
        const analysisRef = adminDb.collection('analysis');
        console.log('Collection found')
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
        
        return NextResponse.json(companies)
    } catch (error) {
        console.log('Analysis error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}