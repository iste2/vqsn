import { adminDb } from "@/lib/firebase/admin-config";
import { analysisCollectionName } from "@/lib/firebase/collection-names";
import { CompanyAnalysis } from "@/lib/analysis/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get all analyses ordered by timestamp
        const analysisSnapshot = await adminDb
            .collection(analysisCollectionName)
            .orderBy('timestamp', 'desc')
            .get();

        // Create a map to store the newest analysis for each company
        const latestAnalysesByCompany = new Map<string, CompanyAnalysis>();

        analysisSnapshot.forEach((doc) => {
            const analysis = doc.data();
            
            const companyAnalysis = analysis as CompanyAnalysis;
            const ticker = companyAnalysis.company.ticker;

            if (!latestAnalysesByCompany.has(ticker)) {
                latestAnalysesByCompany.set(ticker, companyAnalysis);
            }
        });

        const latestAnalyses = Array.from(latestAnalysesByCompany.values());

        return NextResponse.json(latestAnalyses, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch analyses' },
            { status: 500 }
        );
    }
}