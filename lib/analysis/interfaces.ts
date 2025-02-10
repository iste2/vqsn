export interface Company {
    cik: number;
    name: string;
    ticker: string;
    exchange: string;
}

export interface FilingMetadata {
    accessionNumber: string;
    filingDate: string;
    reportDate: string;
    acceptanceDateTime: string;
    act: string;
    form: string;
    fileNumber: string;
    filmNumber: string;
    items: string;
    core_type: string;
    size: number;
    isXBRL: boolean;
    isInlineXBRL: boolean;
    primaryDocument: string;
    primaryDocDescription: string;
    url: string;
}

export interface Form10K {
    item1: string;
    item1a: string;
}

export interface Characteristic {
    score: number;
    reasoning: string;
    examples: string[];
}

export interface PorterForce {
    score: number;
    reasoning: string;
    examples: string[];
}

export interface CompanyAnalysis {
    company: Company;
    form10K: Form10K;
    summary: string;
    characteristics: {
        shortLifeCycleBrands: Characteristic;
        essentialProducts: Characteristic;
        premiumProvider: Characteristic;
        regulationDriven: Characteristic;
        highScalability: Characteristic;
        costLeader: Characteristic;
    };
    porterAnalysis: {
        supplierPower: PorterForce;
        buyerPower: PorterForce;
        newEntrants: PorterForce;
        substitutes: PorterForce;
        competitiveRivalry: PorterForce;
    };
    metadata: {
        analysisDate: string;
    };
}