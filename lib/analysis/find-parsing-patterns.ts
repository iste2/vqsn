import {
    getAllCompanies,
    getCompanyFilingHistoryByCik,
    getCompanyFilingText,
    parseForm10K
} from "@/lib/analysis/read-companies";
import * as fs from 'fs';
import * as path from 'path';

async function findParsingPatterns() {
    const allCompanies = await getAllCompanies();
    const companies = allCompanies.slice(0, 50);
    
    for (const company of companies) {
        const allFilings = await getCompanyFilingHistoryByCik(company.cik);
        if (!allFilings) {
            console.log("Could not fetch filing history", company);
            continue;
        }
        const latest10K = allFilings.find(filing => filing.form === '10-K');
        if (!latest10K) {
            console.log("Could not find 10-K", company.name, allFilings.slice(0,5).map(f => f.form + " " + f.url));
            continue;
        }
        const filingText = await getCompanyFilingText(latest10K);
        const form10K = parseForm10K(filingText);
        if(form10K.item1 == "" || form10K.item1a == "") {
            
            const outputDir = path.join('C:\\Users\\lnadenau\\Desktop', 'parsing-errors');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            const filename = path.join(outputDir, `${company.ticker}-${latest10K.filingDate}.txt`);
            const content = `Company: ${company.name} (${company.cik})\nLink: ${ latest10K.url }\nFiling Date: ${latest10K.filingDate}\n\nFiling Text:\n${filingText}`;
            
            fs.writeFileSync(filename, content, 'utf8');
            console.log(`Wrote parsing error to ${filename}`);
        } else if(form10K.item1.length < 500) {
            
            const outputDir = path.join('C:\\Users\\lnadenau\\Desktop', 'parsing-errors');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            const filename = path.join(outputDir, `${company.ticker}-${latest10K.filingDate}.txt`);
            const content = `Company: ${company.name} (${company.cik})\nLink: ${ latest10K.url }\nFiling Date: ${latest10K.filingDate}\n\nFiling Text:\n${filingText}`;

            fs.writeFileSync(filename, content, 'utf8');
            console.log(`Wrote parsing error to ${filename}`);
        }
    }
}

findParsingPatterns().then(() => console.log("Done!"));