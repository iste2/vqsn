"use server";

import {adminDb} from "@/lib/firebase/admin-config";
import {analysisCollectionName} from "@/lib/firebase/collection-names";
import {CompanyAnalysis, CompanyAnalysisTableView} from "@/lib/analysis/interfaces";

export async function getAnalysis(ticker: string): Promise<CompanyAnalysis> {
    try {
        const analysisSnapshot = await adminDb
            .collection(analysisCollectionName)
            .orderBy('timestamp', 'desc')
            .select(
                'company',
                'summary',
                'characteristics',
                'porterAnalysis',
            )
            .where('company.ticker', '==', ticker)
            .limit(1)
            .get();

        if (analysisSnapshot.empty) {
            throw new Error('Analysis not found');
        }

        return analysisSnapshot.docs[0].data() as CompanyAnalysis;
        
    } catch (error) {
        console.error('Error fetching analysis:', error);
        throw error;
    }
}

export async function getAnalysisTableView(): Promise<CompanyAnalysisTableView[]> {
    try {
        const analysisSnapshot = await adminDb
            .collection(analysisCollectionName)
            .orderBy('timestamp', 'desc')
            .select(
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
            .get();

        const latestAnalysesByCompany = new Map<string, CompanyAnalysisTableView>();

        analysisSnapshot.forEach((doc) => {
            const analysis = doc.data() as CompanyAnalysisTableView;
            const ticker = analysis.company.ticker;

            if (!latestAnalysesByCompany.has(ticker)) {
                latestAnalysesByCompany.set(ticker, analysis);
            }
        });

        return Array.from(latestAnalysesByCompany.values());
    } catch (error) {
        console.error('Error fetching analysis table view:', error);
        throw error;
    }
}