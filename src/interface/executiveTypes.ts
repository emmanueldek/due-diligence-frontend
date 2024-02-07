export interface IFinancialProps {
  year?: string;
  audFinancials?: string;
  audBy?: string;
  source?: string;
  fsDocuments?: string;
}
export interface IInsuranceProps {
  type?: string;
  coverageAmount?: string;
  coverageStatus?: string;
  expiryDate?: string;
  icDocuments?: string;
}
export interface ITaxProps {
  year?: string;
  fillingStatus?: string;
  totalTaxLiability?: string;
  tcDocuments?: string;
}
export interface ICreditHistoryProps {
  type?: string;
  date?: string;
  assetsLiquidated?: string;
  debtsDischarged?: string;
  crdDocuments?: string;
}

export interface ILegalProps {
  year?: string;
  filingStatus?: string;
  totalTaxLiability?: string;
  lgrDocuments?: string;
}
export interface IContractProps {
  date?: string;
  type?: string;
  assetsLiquidated?: string;
  debtsDischarged?: string;
  coDocuments?: string;
}
export interface IReferenceProps {
  coverageAmount?: string;
  type?: string;
  coverageStatus?: string;
  expiryDate?: string;
  rrDocuments?: string;
}
export interface IManagementProps {
  name?: string;
  position?: string;
  location?: string;
}
export interface IEnvironComplianceProps {
  creditScore?: string;
  reportingAgency?: string;
  paymentHistory?: string;
  outstandingCreditLine?: string;
  ecDocuments?: string;
}
export interface ISupplyChainInfo {
  coverageAmount?: string;
  type?: string;
  coverageStatus?: string;
  expiryDate?: string;
  sciDocuments?: string;
}
export interface IShareHolderProps {
  name?: string;
  percentage?: number;
}
export interface IOwnerShipStructure {
  ownershipType?: string;
  shareHolders?: IShareHolderProps[];
  governanceStructure?: string;
}

export interface IProfileProps {
  executiveName?: string;
  executiveDescription?: string;
  organizationName?: string;
  organizationDescription?: string;
  executiveAvatar?: string;
  organizationSize?: string;
  executivePosition?: string;
  position?: string;
  industry?: string;
  location?: string;
  country?: string;
  website?: string;
}

export interface IExecData {
  partnerRequestId: string;
  executiveAvatar: string;
  execOrgDocId: string;
  organizationLogo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  creditReport: never[];
  profile?: IProfileProps;
  insuranceCoverage: IInsuranceProps[];
  creditHistory: ICreditHistoryProps[];
  taxCompliance: ITaxProps[];
  contractualObligations: IContractProps[];
  legalRegulatory: ILegalProps[];
  contract: IContractProps[];
  referencesReputation: IReferenceProps[];
  financialStatements?: IFinancialProps[];
  management?: IManagementProps[];
  environCompliance?: IEnvironComplianceProps[];
  ownershipStructure?: IOwnerShipStructure;
  supplyChainInfo?: ISupplyChainInfo[];
  executivePosition?: string;
}

export interface IExecutiveProps {
  theExecutive: IExecData;
  completionpercentage: string;
}

export interface IRecord {
  data: IExecutiveProps | undefined;
}
