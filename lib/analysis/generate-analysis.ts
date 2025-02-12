import {
    getCompanyByTicker,
    getCompanyFilingHistoryByCik,
    getCompanyFilingText,
    parseForm10K
} from "@/lib/analysis/read-companies";
import {Company, CompanyAnalysis} from "@/lib/analysis/interfaces";
import {createLLMClient} from "llm-polyglot";
import Instructor from "@instructor-ai/instructor";
import { z } from "zod";
import {
    businessModelIntroduction, businessModelSummary, buyerPower, competitiveRivalry, costLeader,
    essentialProducts, highScalability, newEntrants, porterAnalysisIntroduction,
    premiumProvider, regulationDriven,
    shortLifeCycleBrands, substitutes, supplierPower
} from "@/lib/analysis/prompts";

export async function generateAnalysisForSingeCompany(company: Company) : Promise<CompanyAnalysis | undefined> {
    // get latest 10-K filing
    const allFilings = await getCompanyFilingHistoryByCik(company.cik);
    if (!allFilings) {
        return;
    }
    const latest10K = allFilings.find(filing => filing.form === '10-K');
    if (!latest10K) {
        return;
    }
    const filingText = await getCompanyFilingText(latest10K);
    const form10K = parseForm10K(filingText);
    
    // setup llm client
    const client = createLLMClient({
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY
    });
    
    const claude35SonnetLatest = "claude-3-5-sonnet-latest";
    const claude35Haiku20241022 = "claude-3-5-haiku-20241022";
    const claude3Haiku20240307 = "claude-3-haiku-20240307";
    const model = claude35SonnetLatest;
    const maxTokens = 8192;
    
    const instructor = Instructor({
        client: client,
        mode: 'TOOLS'
    });
    
    // business model schema
    const summarySchema = z.object({
        summary: z.string().describe('The summary of the business model.')
    });
    
    // generate business model summary  
    const businessModelSummaryAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelSummary } \n\n ${ form10K.item1 }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: summarySchema,
            name: 'summary'
        }
    });
    
    // business characteristics schema
    const characteristicsSchema = z.object({
        score: z.number().describe('The score of the characteristic on a scale from 0 to 10.'),
        reasoning: z.string().describe('The reasoning behind the score.'),
        examples: z.array(z.string()).describe('Examples from the business model that support the reasoning.')
    });

    // generate analysis for short life cycle brands
    const shortLifeCycleBrandsAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelIntroduction } ${ shortLifeCycleBrands } \n\n ${ form10K.item1 }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });
    
    // generate analysis for essential products
    const essentialProductsAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelIntroduction } ${ essentialProducts } \n\n ${ form10K.item1 }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });
    
    // generate analysis for premium provider
    const premiumProviderAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelIntroduction } ${ premiumProvider } \n\n ${ form10K.item1 }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });
    
    // generate analysis for regulation driven
    const regulationDrivenAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelIntroduction } ${ regulationDriven } \n\n ${ form10K.item1 }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });
    
    // generate analysis for high scalability
    const highScalabilityAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelIntroduction } ${ highScalability } \n\n ${ form10K.item1 }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });
    
    // generate analysis for cost leader
    const costLeaderAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelIntroduction } ${ costLeader } \n\n ${ form10K.item1 }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });

    // porters forces schema
    const portersSchema = z.object({
        score: z.number().describe('The score of the porter\'s force on a scale from 0 to 10.'),
        reasoning: z.string().describe('The reasoning behind the score.'),
        examples: z.array(z.string()).describe('Examples from the risks report that support the reasoning.')
    });
    
    // generate analysis for supplier power
    const supplierPowerAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ porterAnalysisIntroduction } ${ supplierPower } \n\n ${ form10K.item1a }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: portersSchema,
            name: 'porters force'
        }
    });
    
    // generate analysis for buyer power
    const buyerPowerAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ porterAnalysisIntroduction } ${ buyerPower } \n\n ${ form10K.item1a }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: portersSchema,
            name: 'porters force'
        }
    });
    
    // generate analysis for new entrants
    const newEntrantsAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ porterAnalysisIntroduction } ${ newEntrants } \n\n ${ form10K.item1a }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: portersSchema,
            name: 'porters force'
        }
    });
    
    // generate analysis for substitutes
    const substitutesAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ porterAnalysisIntroduction } ${ substitutes } \n\n ${ form10K.item1a }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: portersSchema,
            name: 'porters force'
        }
    });
    
    // generate analysis for competitive rivalry
    const competitiveRivalryAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ porterAnalysisIntroduction } ${ competitiveRivalry } \n\n ${ form10K.item1a }` }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: portersSchema,
            name: 'porters force'
        }
    });
    
    // return analysis
    return {
        company: company,
        form10K: form10K,
        summary: businessModelSummaryAnalysis.summary,
        characteristics: {
            shortLifeCycleBrands: {
                score: shortLifeCycleBrandsAnalysis.score,
                reasoning: shortLifeCycleBrandsAnalysis.reasoning,
                examples: shortLifeCycleBrandsAnalysis.examples
            },
            essentialProducts: {
                score: essentialProductsAnalysis.score,
                reasoning: essentialProductsAnalysis.reasoning,
                examples: essentialProductsAnalysis.examples
            },
            premiumProvider: {
                score: premiumProviderAnalysis.score,
                reasoning: premiumProviderAnalysis.reasoning,
                examples: premiumProviderAnalysis.examples
            },
            regulationDriven: {
                score: regulationDrivenAnalysis.score,
                reasoning: regulationDrivenAnalysis.reasoning,
                examples: regulationDrivenAnalysis.examples
            },
            highScalability: {
                score: highScalabilityAnalysis.score,
                reasoning: highScalabilityAnalysis.reasoning,
                examples: highScalabilityAnalysis.examples
            },
            costLeader: {
                score: costLeaderAnalysis.score,
                reasoning: costLeaderAnalysis.reasoning,
                examples: costLeaderAnalysis.examples
            }
        },
        porterAnalysis: {
            supplierPower: {
                score: supplierPowerAnalysis.score,
                reasoning: supplierPowerAnalysis.reasoning,
                examples: supplierPowerAnalysis.examples
            },
            buyerPower: {
                score: buyerPowerAnalysis.score,
                reasoning: buyerPowerAnalysis.reasoning,
                examples: buyerPowerAnalysis.examples
            },
            newEntrants: {
                score: newEntrantsAnalysis.score,
                reasoning: newEntrantsAnalysis.reasoning,
                examples: newEntrantsAnalysis.examples
            },
            substitutes: {
                score: substitutesAnalysis.score,
                reasoning: substitutesAnalysis.reasoning,
                examples: substitutesAnalysis.examples
            },
            competitiveRivalry: {
                score: competitiveRivalryAnalysis.score,
                reasoning: competitiveRivalryAnalysis.reasoning,
                examples: competitiveRivalryAnalysis.examples
            }
        },
        metadata: {
            analysisDate: new Date().toISOString(),
        }
    };
}

// getCompanyByTicker('AAPL').then(async company => {
//     if(!company) {
//         return;
//     }
//     const result = await generateAnalysisForSingeCompany(company);
//     if(result) {
//         console.log(result);
//     }
// });