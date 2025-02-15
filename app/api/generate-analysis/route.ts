import { NextRequest, NextResponse } from 'next/server'
import {adminDb} from "@/lib/firebase/admin-config";
import {getAllCompanies, getCompanyFilingHistoryByCik} from "@/lib/analysis/read-companies";
import {Company, CompanyAnalysis} from "@/lib/analysis/interfaces";
import {generateAnalysisForSingeCompany} from "@/lib/analysis/generate-analysis";
import {FieldValue} from "firebase-admin/firestore";
import {firestore} from "firebase-admin";
import {analysisCollectionName} from "@/lib/firebase/collection-names";

const params = {
    key: "key",
    force: "force",
    numberOfCompanies: "numberOfCompanies"
} as const;

interface ErrorResponse {
    error: string;
    status: number;
}

function createErrorResponse(message: string, status: number): NextResponse {
    return NextResponse.json({ error: message, status }, { status });
}

async function validateApiKey(request: NextRequest): Promise<ErrorResponse | null> {
    const validApiKey = process.env.GENERATE_ANALYSIS_KEY;
    
    if (!validApiKey) {
        return { error: 'Server configuration error', status: 500 };
    }

    const key = request.nextUrl.searchParams.get(params.key);
    if (key !== validApiKey) {
        return { error: 'Invalid API key', status: 401 };
    }

    return null;
}

async function getCompaniesToAnalyze(request: NextRequest): Promise<Company[]> {
    const numberOfCompanies = request.nextUrl.searchParams.get(params.numberOfCompanies);
    const companies = await getAllCompanies();
    
    return numberOfCompanies 
        ? companies.slice(0, parseInt(numberOfCompanies))
        : companies;
}

async function shouldAnalyzeCompany(company: Company, lastFiling: { filingDate: string } | undefined, force: boolean): Promise<boolean> {
    if (!lastFiling) return false;
    if (force) return true;

    const lastFilingTimestamp = firestore.Timestamp.fromDate(new Date(lastFiling.filingDate));
    const querySnapshot = await adminDb.collection(analysisCollectionName)
        .where('company.cik', '==', company.cik)
        .where('timestamp', '>', lastFilingTimestamp)
        .limit(1)
        .get();

    return querySnapshot.empty;
}

async function saveAnalysisToFirebase(analysis: CompanyAnalysis): Promise<void> {
    const analysisRef = adminDb.collection(analysisCollectionName);
    await analysisRef.add({
        company: {
            name: analysis.company.name,
            cik: analysis.company.cik,
            ticker: analysis.company.ticker,
            exchange: analysis.company.exchange,
        },
        form10K: analysis.form10K,
        summary: analysis.summary,
        characteristics: analysis.characteristics,
        porterAnalysis: analysis.porterAnalysis,
        timestamp: FieldValue.serverTimestamp(),
    });
}

export async function GET(request: NextRequest) {
    const apiKeyError = await validateApiKey(request);
    if (apiKeyError) {
        return createErrorResponse(apiKeyError.error, apiKeyError.status);
    }

    try {
        const companies = await getCompaniesToAnalyze(request);
        console.log(companies);
        const force = request.nextUrl.searchParams.get(params.force) === 'true';
        const analyzedCompanies: CompanyAnalysis[] = [];

        for (const company of companies) {
            const lastFiling = (await getCompanyFilingHistoryByCik(company.cik))
                ?.find(filing => filing.form === '10-K');

            if (!await shouldAnalyzeCompany(company, lastFiling, force)) {
                console.log("Skipping analysis for", company.name);
                continue;
            }

            const analysis = await generateAnalysisForSingeCompany(company);
            if (analysis) {
                await saveAnalysisToFirebase(analysis);
                analyzedCompanies.push(analysis);
            }
        }

        return NextResponse.json(analyzedCompanies.map(company => company.company));
    } catch (error) {
        return createErrorResponse(
            error instanceof Error ? error.message : 'An unexpected error occurred',
            500
        );
    }
}