import {getTextBetween} from "@/lib/string-utils";
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

    let item1 = getTextBetween(plainText, 'Item 1.&#160;&#160;&#160;&#160;Business', 'Item 1A.&#160;&#160;&#160;&#160;Risk Factors');
    if(item1 == "") {
        item1 = getTextBetween(plainText, 'Item 1. Business', 'Item 1A. Risk Factors')
    }
    if(item1 == "") {
        item1 = getTextBetween(plainText, 'ITEM 1. BUSINESS', 'ITEM 1A. RISK FACTORS')
    }
    if(item1 == "") {
        item1 = getTextBetween(plainText, 'Item 1.Business', 'Item 1A. Risk Factors')
    }
    if(item1 == "") {
        item1 = getTextBetween(plainText, 'Item 1.Business', 'Item 1A.Risk Factors')
    }
    

    let item1a = getTextBetween(plainText, 'Item 1A.&#160;&#160;&#160;&#160;Risk Factors', 'Item 1B.&#160;&#160;&#160;&#160;Unresolved Staff Comments');
    if(item1a == "") {
        item1a = getTextBetween(plainText, 'Item 1A. Risk Factors', 'Item 1B. Unresolved Staff Comments')
    }
    if(item1a == "") {
        item1a = getTextBetween(plainText, 'ITEM 1A. RISK FACTORS', 'ITEM 1B. UNRESOLVED STAFF COMMENTS')
    }
    if(item1a == "") {
        item1a = getTextBetween(plainText, 'Item 1A. Risk Factors', 'Item 1B.Unresolved Staff Comments')
    }
    if(item1a == "") {
        item1a = getTextBetween(plainText, 'Item 1A.Risk Factors', 'Item 1B.Unresolved Staff Comments')
    }

    return {
        item1: item1,
        item1a: item1a,
    };
}