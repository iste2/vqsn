import {
    getCompanyByTicker,
    getCompanyFilingHistoryByCik,
    getCompanyFilingText,
    parseForm10K
} from "@/lib/analysis/read-companies";
import {Company} from "@/lib/analysis/interfaces";
import {createLLMClient} from "llm-polyglot";
import Instructor from "@instructor-ai/instructor";
import { z } from "zod";
import {businessModelIntroduction, shortLifeCycleBrands} from "@/lib/analysis/prompts";

export async function generateAnalysisForSingeCompany(company: Company) {
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
    
    const instructor = Instructor({
        client: client,
        mode: 'TOOLS'
    });
    
    // generate analysis for short life cycle brands
    const characteristicsSchema = z.object({
        score: z.number().describe('The score of the characteristic on a scale from 0 to 10.'),
        reasoning: z.string().describe('The reasoning behind the score.'),
        examples: z.array(z.string()).describe('Examples that support the reasoning.')
    });
    
    const shortLifeCycleBrandsAnalysis = await instructor.chat.completions.create({
        messages: [{ role: 'user', content: `${ businessModelIntroduction } ${ shortLifeCycleBrands } \n\n ${ form10K.item1 }` }],
        max_tokens: 8192,
        model: "claude-3-5-sonnet-latest",
        response_model: {
            schema: characteristicsSchema,
            name: 'characteristics'
        }
    });
    
    console.log(shortLifeCycleBrandsAnalysis);
}

getCompanyByTicker('AAPL').then(async company => {
    if(!company) {
        return;
    }
    await generateAnalysisForSingeCompany(company);
});