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
  profileLogo?: string;
  organizationLogo?:string
  organizationSize?: string;
  executivePosition?: string;
  position?: string;
  industry?: string;
  location?: string;
  country?: string;
  website?: string;
}

export interface IDataProps {
  creditReport: never[];
  profile?: IProfileProps;
  insurance: IInsuranceProps[];
  creditHistory: ICreditHistoryProps[];
  tax: ITaxProps[];
  legal: ILegalProps[];
  contract: IContractProps[];
  reference: IReferenceProps[];
  financial?: IFinancialProps[];
  management?: IManagementProps[];
  environCompliance?: IEnvironComplianceProps[];
  ownershipStructure?: IOwnerShipStructure;
  supplyChainInfo?: ISupplyChainInfo[];
}

export type TUserResponseSchema = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  position?: string;
  isSuperAdmin?: boolean;
  createdAt: string;
  __v: number;
};
