import {getAllSubstringsBetween} from "@/lib/string-utils";
import {Company, FilingMetadata, Form10K} from "@/lib/analysis/interfaces";

const header = {
    'User-Agent': 'lnadenau@web.de'
}

/**
 * Fetches all companies from the SEC API.
 */
export async function getAllCompanies(): Promise<Company[]> {
    const result = new Array<Company>();
    const response = await fetch('https://www.sec.gov/files/company_tickers_exchange.json');
    const data = await response.json();
    data['data'].forEach((entry: object[]) => {
        result.push({
            cik: entry[0] as unknown as number,
            name: entry[1] as unknown as string,
            ticker: entry[2] as unknown as string,
            exchange: entry[3] as unknown as string 
        });
    });
    return result;
}

/**
 * Fetches all companies from the SEC API and returns the company with the given ticker.
 * @param ticker
 */
export async function getCompanyByTicker(ticker: string): Promise<Company | undefined> {
    const companies = await getAllCompanies();
    return companies.find(company => company.ticker === ticker);
}

/**
 * Fetches the filing history of a company with the given CIK.
 * @param cik
 */
export async function getCompanyFilingHistoryByCik(cik: number): Promise<FilingMetadata[] | undefined> {
    const result = new Array<FilingMetadata>();
    const url = `https://data.sec.gov/submissions/CIK${cik.toString().padStart(10, '0')}.json`;
    const response = await fetch(url, { method: 'GET', headers: header });
    if(response.status !== 200) {
        return undefined;
    }
    const data = await response.json();
    const filingsData = data['filings']['recent'];
    filingsData['form'].forEach((_ : object, index: number) => {
        result.push({
            accessionNumber: filingsData['accessionNumber'][index],
            filingDate: filingsData['filingDate'][index],
            reportDate: filingsData['reportDate'][index],
            acceptanceDateTime: filingsData['acceptanceDateTime'][index],
            act: filingsData['act'][index],
            form: filingsData['form'][index],
            fileNumber: filingsData['fileNumber'][index],
            filmNumber: filingsData['filmNumber'][index],
            items: filingsData['items'][index],
            core_type: filingsData['core_type'][index],
            size: filingsData['size'][index],
            isXBRL: filingsData['isXBRL'][index] === '1',
            isInlineXBRL: filingsData['isInlineXBRL'][index] === '1',
            primaryDocument: filingsData['primaryDocument'][index],
            primaryDocDescription: filingsData['primaryDocDescription'][index],
            url: `https://www.sec.gov/Archives/edgar/data/${ cik }/${ filingsData['accessionNumber'][index].replaceAll('-', '') }/${ filingsData['primaryDocument'][index] }`
        });
    });
    return result;
}

/**
 * Fetches the filing history of a company with the given ticker.
 * @param ticker
 */
export async function getCompanyFilingHistoryByTicker(ticker: string): Promise<FilingMetadata[] | undefined> {
    const company = await getCompanyByTicker(ticker);
    if (!company) {
        return undefined;
    }
    return await getCompanyFilingHistoryByCik(company.cik);
}

/**
 * Fetches the plain text of a filing.
 * @param filing
 */
export async function getCompanyFilingText(filing: FilingMetadata): Promise<string> {
    const response = await fetch(filing.url, { method: 'GET', headers: header });
    const data = await response.text();
    return data.replace(/<[^>]*(>|$)| |‌|»|«|>/g, ' ');
}

/**
 * Parses the plain text of a Form 10-K filing.
 * @param plainText
 */
export function parseForm10K(plainText: string): Form10K {

    // let item1SearchResults = getAllSubstringsBetween(plainText, /ITEM(?:(?:\s|&#160;|\t))*1\.(?:(?:\s|&#160;|\t))*BUSINESS/i, /ITEM(?:(?:\s|&#160;|\t))*1A\.(?:(?:\s|&#160;|\t))*RISK\sFACTORS/i);
    // let item1aSearchResults = getAllSubstringsBetween(plainText, /ITEM(?:(?:\s|&#160;|\t))*1A\.(?:(?:\s|&#160;|\t))*RISK\sFACTORS/i, /ITEM(?:(?:\s|&#160;|\t))*1B\.(?:(?:\s|&#160;|\t))*UNRESOLVED\sSTAFF\sCOMMENTS/i);

    const item1SearchResults = getAllSubstringsBetween(plainText,
        /ITEM(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*1(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*B(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*U(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*I(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*N(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*E(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S/i,
        /ITEM(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*1A(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*R(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*I(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*K(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*F(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*A(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*C(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*T(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*O(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*R(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S/i);

    const item1aSearchResults = getAllSubstringsBetween(plainText,
        /ITEM(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*1A(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*R(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*I(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*K(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*F(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*A(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*C(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*T(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*O(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*R(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S/i,
        /ITEM(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*1B(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*U(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*N(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*R(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*E(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*O(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*L(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*V(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*E(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*D(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*T(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*A(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*F(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*F(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*C(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*O(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*M(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*M(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*E(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*N(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*T(?:(?:\s|&#160;|\t|&#8212;|-|[:\.]))*S/i);
    
    
    // take the longest substring
    const item1 = item1SearchResults.reduce((a, b) => a.length >= b.length ? a : b, '');
    let item1a = item1aSearchResults.reduce((a, b) => a.length >= b.length ? a : b, '');
    
    if(item1a.length < 500) {
        item1a = item1;
    }

    return {
        item1: item1 ?? "",
        item1a: item1a ?? "",
    };
}