export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: "Single Family" | "Condo" | "Townhouse" | "Multi-Family";
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: number;
  images: string[];
  description: string;
}

export interface MortgageListing {
  id: string;
  property: Property;
  loanAmount: number;
  originalLoanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  remainingBalance: number;
  paymentHistory: "Current" | "Late" | "Default";
  loanToValue: number;
  creditScore: number;
  borrowerIncome: number;
  listingDate: string;
  status: "Active" | "Pending" | "Sold" | "Foreclosure";
  riskLevel: "Low" | "Medium" | "High";
  expectedReturn: number;
  minimumInvestment: number;
}

export interface MarketData {
  date: string;
  mortgageRates: number;
  foreclosureRate: number;
  averageHomePrice: number;
  mortgageVolume: number;
  defaultRate: number;
}

export interface PropertyAnalytics {
  propertyId: string;
  estimatedValue: number;
  priceHistory: Array<{
    date: string;
    price: number;
  }>;
  marketTrends: {
    appreciation: number;
    daysOnMarket: number;
    comparableProperties: number;
  };
  riskFactors: string[];
  investmentMetrics: {
    capRate: number;
    cashOnCash: number;
    irr: number;
  };
}

export interface SearchFilters {
  minLoanAmount?: number;
  maxLoanAmount?: number;
  propertyType?: string[];
  state?: string[];
  riskLevel?: string[];
  status?: string[];
  minReturn?: number;
  maxReturn?: number;
}
