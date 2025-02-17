import { Waitlist } from '@/components/waitlist';
import React from 'react';

function ScoringPage() {
    return (
        <>
            <div className="flex justify-center min-h-screen bg-slate-50">
                <div className="max-w-[1000px] mx-auto p-4">
                    <section className="py-12 p-6">
                        <h2 className="text-3xl font-bold mb-4">A Comprehensive Guide to Business Model and Risk Analysis Scoring</h2>
                        <p className="mb-4">
                            When analyzing a business through our scoring system, you&apos;ll see eleven key dimensions that together paint a complete picture of both the company&apos;s business model strengths and its competitive risks. Each dimension is scored from 0 to 10, with the business model aspects measuring strength (higher is stronger) and the risk aspects measuring protection (higher means lower risk).
                        </p>
                        <h3 className="text-xl font-semibold mb-2">Business Model Characteristics</h3>
                        <p className="mb-4">
                            In the first part of the analysis, we look at how a company generates value and competes in the market. A high score in Short Life Cycle Brands (7-10) indicates strong recurring revenue through frequent purchases and brand loyalty. Essential Products scores reveal resilience to economic cycles – companies scoring high here (8-10) provide must-have products or services. Premium Provider ratings show ability to command high prices while maintaining customer satisfaction, with top scores (9-10) indicating luxury market leaders.
                        </p>
                        <p className="mb-4">
                            Regulation Driven scores indicate how much business comes from mandatory purchases or regulatory requirements, with high scores (8-10) suggesting stable, regulation-protected revenue streams. High Scalability measures growth potential without proportional cost increases – technology companies often score highest here (9-10). Cost Leader ratings show efficiency and ability to compete on price while maintaining profitability, with high scores (8-10) indicating market-leading operational efficiency.
                        </p>
                        <h3 className="text-xl font-semibold mb-2">Competitive Risk Assessment</h3>
                        <p className="mb-4">
                            The second part evaluates competitive threats using Porter&apos;s Five Forces, where higher scores mean lower risks. Supplier Power scores indicate control over the supply chain – high scores (8-10) show strong negotiating positions with suppliers. Buyer Power reveals customer leverage, with high scores (8-10) indicating diverse, dependent customer bases. New Entrants scores show barrier strength against newcomers, where high scores (9-10) indicate strong market protection through patents, capital requirements, or regulations.
                        </p>
                        <p className="mb-4">
                            Substitutes scores reveal how easily customers could switch to alternatives, with high scores (8-10) showing strong product differentiation or high switching costs. Competitive Rivalry ratings indicate current market competition intensity, where high scores (8-10) suggest stable market share in a rationally competitive environment.
                        </p>
                        <h3 className="text-xl font-semibold mb-2">Reading the Full Picture</h3>
                        <p className="mb-4">
                            These eleven dimensions work together to tell a comprehensive story. For instance, a software company might score high in High Scalability (9), low in Supplier Power risk (8), but moderate in Competitive Rivalry protection (5), suggesting a scalable business model facing significant competition. A luxury brand might excel in Premium Provider (9), score well in New Entrants protection (8), but show lower scores in Essential Products (3), indicating strong market position but economic cycle sensitivity.
                        </p>
                        <p>
                            The power of this system lies in its ability to highlight both strengths and vulnerabilities. A company scoring high across business model dimensions but low in competitive protection might be highly profitable now but face future challenges. Conversely, a business with moderate model scores but strong competitive protection might offer stable, long-term value despite lower current profitability.
                        </p>
                    </section>
                </div>
            </div>
            <Waitlist />
        </>
    );
}

export default ScoringPage;
