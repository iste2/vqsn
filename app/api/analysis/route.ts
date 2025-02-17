import { adminDb } from "@/lib/firebase/admin-config";
import { analysisCollectionName } from "@/lib/firebase/collection-names";
import { CompanyAnalysis, CompanyAnalysisTableView } from "@/lib/analysis/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const ticker = request.nextUrl.searchParams.get('ticker');

        // If ticker is provided, return full analysis for that company
        if (ticker) {
            const analysisSnapshot = await adminDb
                .collection(analysisCollectionName)
                .select(
                    'timestamp',
                    'company',
                    'summary',
                    'characteristics',
                    'porterAnalysis',
                )
                .where('company.ticker', '==', ticker)
                .orderBy('timestamp', 'desc')
                .limit(1)
                .get();

            if (analysisSnapshot.empty) {
                return NextResponse.json({ error: 'Analysis not found' }, { status: 404 });
            }

            const analysis = analysisSnapshot.docs[0].data() as CompanyAnalysis;
            return NextResponse.json(analysis, { status: 200 });
        }

        // Otherwise return table view for all companies
        const analysisSnapshot = await adminDb
            .collection(analysisCollectionName)
            .select(
                'timestamp',
                'company',
                'characteristics.shortLifeCycleBrands.score',
                'characteristics.essentialProducts.score',
                'characteristics.premiumProvider.score',
                'characteristics.regulationDriven.score',
                'characteristics.highScalability.score',
                'characteristics.costLeader.score',
                'porterAnalysis.supplierPower.score',
                'porterAnalysis.buyerPower.score',
                'porterAnalysis.newEntrants.score',
                'porterAnalysis.substitutes.score',
                'porterAnalysis.competitiveRivalry.score'
            )
            .orderBy('timestamp', 'desc')
            .get();

        // Create a map to store the newest analysis for each company
        const latestAnalysesByCompany = new Map<string, CompanyAnalysisTableView>();

        analysisSnapshot.forEach((doc) => {
            const analysis = doc.data() as CompanyAnalysisTableView;
            const ticker = analysis.company.ticker;

            if (!latestAnalysesByCompany.has(ticker)) {
                latestAnalysesByCompany.set(ticker, analysis);
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