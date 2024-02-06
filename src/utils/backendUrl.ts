export const BACKEND_URL = {
  VERSION: {
    V1: "/api/v1",
  },
  EXECUTIVE: {
    EXECUTIVES_ACTIONS: "/executive/all",
    AUDIT_TRAIL: "/executive/audit-trail",
    VIEW_EXECUTIVES: "/api/v1/executive/view",
    RECORDS: "executive/records",
    UPDATE_EXECUTIVES: "/executive/update",
  },
  ORGANIZATION: {
    PUBLISH: "/organization/publish",
    ORGANIZATION_ACTIONS: "/organization/all",
    AUDIT_TRAIL: "/organization/audit-trail",
    VIEW_EXECUTIVES: "/organization/view",
  },
  REQUEST: {
    NEW_PROFILES: {
      ORGANIZATION: "/request/view/organization/new-profiles",
      EXECUTIVE: "/request/view/executive/new-profiles",
    },
    ADD_RECORDS: {
      ORGANIZATION: "/request/view/organization/records",
      EXECUTIVE: "/request/view/executive/records",
    },
    SUGGESTIONS: {
      ORGANIZATION: "/request/view/organization/suggestions",
      EXECUTIVE: "/request/view/executive/suggestions",
    },
    VIEW_SINGLE_REQUEST: "/request/view/single",
    COUNT_ORGANIZATION_REQUEST: "/request/organization/data",
    ACCEPT_REQUEST: "/request/accept",
    DECLINE_REQUEST: "/request/decline",
  },
};

export type RECORD_FLAGS =
  | "profile"
  | "financialStatements"
  | "creditHistory"
  | "management"
  | "environmentalCompliance"
  | "contractualObligations"
  | "supplyChainInformation"
  | "ownershipStructure"
  | "taxCompliance"
  | "legalRegulatory"
  | "insuranceCoverage"
  | "referencesReputation";

export type EXECUTIVE_FLAGS = "published" | "draft";
export type REQUEST_FLAGS = "pending" | "declined";
