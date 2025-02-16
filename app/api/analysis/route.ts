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
            .orderBy('timestamp', 'desc')
            .get();

        // Create a map to store the newest analysis for each company
        const latestAnalysesByCompany = new Map<string, CompanyAnalysisTableView>();

        analysisSnapshot.forEach((doc) => {
            const analysis = doc.data() as CompanyAnalysis;
            const ticker = analysis.company.ticker;

            if (!latestAnalysesByCompany.has(ticker)) {
                // Convert to table view
                const tableView: CompanyAnalysisTableView = {
                    company: analysis.company,
                    characteristics: {
                        shortLifeCycleBrands: { score: analysis.characteristics.shortLifeCycleBrands.score },
                        essentialProducts: { score: analysis.characteristics.essentialProducts.score },
                        premiumProvider: { score: analysis.characteristics.premiumProvider.score },
                        regulationDriven: { score: analysis.characteristics.regulationDriven.score },
                        highScalability: { score: analysis.characteristics.highScalability.score },
                        costLeader: { score: analysis.characteristics.costLeader.score }
                    },
                    porterAnalysis: {
                        supplierPower: { score: analysis.porterAnalysis.supplierPower.score },
                        buyerPower: { score: analysis.porterAnalysis.buyerPower.score },
                        newEntrants: { score: analysis.porterAnalysis.newEntrants.score },
                        substitutes: { score: analysis.porterAnalysis.substitutes.score },
                        competitiveRivalry: { score: analysis.porterAnalysis.competitiveRivalry.score }
                    }
                };
                latestAnalysesByCompany.set(ticker, tableView);
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