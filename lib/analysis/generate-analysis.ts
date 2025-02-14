import {
    // getCompanyByTicker,
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
    
    // const claude35SonnetLatest = "claude-3-5-sonnet-latest";
    // const claude35Haiku20241022 = "claude-3-5-haiku-20241022";
    // const claude3Haiku20240307 = "claude-3-haiku-20240307";
    const model = "claude-3-5-sonnet-latest";
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
    const characteristicsScoreDescription = 'The score of the characteristic on a scale from 0 to 10.';
    const characteristicsReasoningDescription = 'The reasoning behind the score.';
    const characteristicsExamplesDescription = 'Examples from the business model that support the reasoning.';
    
    const characteristicsSchema = z.object({
        shortLifeCycleBrands: z.object({
            score: z.number().describe(characteristicsScoreDescription),
            reasoning: z.string().describe(characteristicsReasoningDescription),
            examples: z.array(z.string()).describe(characteristicsExamplesDescription)
        }),
        essentialProducts: z.object({
            score: z.number().describe(characteristicsScoreDescription),
            reasoning: z.string().describe(characteristicsReasoningDescription),
            examples: z.array(z.string()).describe(characteristicsExamplesDescription)
        }),
        premiumProvider: z.object({
            score: z.number().describe(characteristicsScoreDescription),
            reasoning: z.string().describe(characteristicsReasoningDescription),
            examples: z.array(z.string()).describe(characteristicsExamplesDescription)
        }),
        regulationDriven: z.object({
            score: z.number().describe(characteristicsScoreDescription),
            reasoning: z.string().describe(characteristicsReasoningDescription),
            examples: z.array(z.string()).describe(characteristicsExamplesDescription)
        }),
        highScalability: z.object({
            score: z.number().describe(characteristicsScoreDescription),
            reasoning: z.string().describe(characteristicsReasoningDescription),
            examples: z.array(z.string()).describe(characteristicsExamplesDescription)
        }),
        costLeader: z.object({
            score: z.number().describe(characteristicsScoreDescription),
            reasoning: z.string().describe(characteristicsReasoningDescription),
            examples: z.array(z.string()).describe(characteristicsExamplesDescription)
        })
    });
    
    // characteristics analysis
    const characteristicsAnalysis = await instructor.chat.completions.create({
        messages: [
            { 
                role: 'user', 
                content: `
                ${ businessModelIntroduction } 
                \n ${ shortLifeCycleBrands } 
                \n ${ essentialProducts } 
                \n ${ premiumProvider } 
                \n ${ regulationDriven } 
                \n ${ highScalability }
                \n ${ costLeader }
                \n\n ${ form10K.item1 }`
            }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });

    // porters forces schema    
    const portersScoreDescription = 'The score of the porter\'s force on a scale from 0 to 10.';
    const portersReasoningDescription = 'The reasoning behind the score.';
    const portersExamplesDescription = 'Examples from the risks report that support the reasoning.';

    const portersSchema = z.object({
        supplierPower: z.object({
            score: z.number().describe(portersScoreDescription),
            reasoning: z.string().describe(portersReasoningDescription),
            examples: z.array(z.string()).describe(portersExamplesDescription)            
        }),
        buyerPower: z.object({
            score: z.number().describe(portersScoreDescription),
            reasoning: z.string().describe(portersReasoningDescription),
            examples: z.array(z.string()).describe(portersExamplesDescription)            
        }),
        newEntrants: z.object({
            score: z.number().describe(portersScoreDescription),
            reasoning: z.string().describe(portersReasoningDescription),
            examples: z.array(z.string()).describe(portersExamplesDescription)            
        }),
        substitutes: z.object({
            score: z.number().describe(portersScoreDescription),
            reasoning: z.string().describe(portersReasoningDescription),
            examples: z.array(z.string()).describe(portersExamplesDescription)            
        }),
        competitiveRivalry: z.object({
            score: z.number().describe(portersScoreDescription),
            reasoning: z.string().describe(portersReasoningDescription),
            examples: z.array(z.string()).describe(portersExamplesDescription)            
        })
    });

    // porters schema analysis
    const porterAnalysis = await instructor.chat.completions.create({
        messages: [
            { 
                role: 'user', 
                content: `
                ${ porterAnalysisIntroduction }
                \n ${ supplierPower }
                \n ${ buyerPower }
                \n ${ newEntrants }
                \n ${ substitutes }
                \n ${ competitiveRivalry }
                \n\n ${ form10K.item1 }`
            }],
        max_tokens: maxTokens,
        model: model,
        response_model: {
            schema: portersSchema,
            name: 'porterAnalysis'
        }
    });
    
    return {
        company: company,
        form10K: form10K,
        summary: businessModelSummaryAnalysis.summary,
        characteristics: characteristicsAnalysis,
        porterAnalysis: porterAnalysis,
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