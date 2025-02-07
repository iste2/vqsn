interface Characteristic {
  score: number;
  reasoning: string;
  examples: string[];
}

interface PorterForce {
  riskScore: number;
  keyFactors: string[];
  threats: string[];
  mitigations: string[];
  reasoning: string;
}

interface Example {
  companyName: string;
  businessModelSummary: string;
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
  overallAssessment: {
    primaryRisks: string[];
    competitiveAdvantages: string[];
  };
  metadata: {
    analysisDate: string;
    confidenceLevel: string;
    assumptions: string[];
  };
}

export default Example;
