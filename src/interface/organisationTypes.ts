export interface IDraftData {
  organizationId: string;
  organizationName: string;
  completionPercentage: number;
  assignees: [];
  createdAt: string;
  updatedAt: string;
}
export interface IDraftsProps {
  drafts: IDraftData;
}

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
export interface ICreditRatingProps {
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
  organizationLogo: string | undefined;
  executiveName?: string;
  executiveDescription?: string;
  organizationName?: string;
  profileLogo?: string;
  organizationDescription?: string;
  organizationSize?: string;
  position?: string;
  industry?: string;
  location?: string;
  country?: string;
  website?: string;
  cacNumber?: string;
}

export interface IOrgData {
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
  ownershipStructure?: IOwnerShipStructure[];
  supplyChainInfo?: ISupplyChainInfo[];
}

export interface IOrganisationProps {
  theOrganization: IOrgData;
  completionpercentage: string;
}

export interface IDataSetProps {
  data: IOrganisationProps | undefined;
}

export type TAuditSchema = {
  action: string;
  avatarOrLogo: string;
  createdAt: string;
  executiveId?: string;
  executiveName?: string;
  organizationName?: string;
  organizationId?: string;
  partnerWorkspaceId: string;
  profileType: string;
  recordLocation: string;
  userId: string;
  __v: string | number;
  _id: string;
};
