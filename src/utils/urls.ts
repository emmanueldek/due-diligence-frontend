const env = import.meta.env.VITE_REACT_APP_NODE_ENV;

export const BACKEND_URL = {
  baseURL:
    env === "production"
      ? `${import.meta.env.VITE_REACT_APP_NODE_ENV}`
      : env === "development"
      ? `${import.meta.env.VITE_REACT_APP_NOMDEK_ADMIN_URL}`
      : "",
  VERSION: {
    v1: "/api/v1",
  },
  EXECUTIVE: {
    EXECUTIVES_ACTIONS: "/executive/all",
    AUDIT_TRAIL: "/executive/audit-trail",
    VIEW_EXECUTIVES: "/executive/view",
    REQUEST_RECORDS: "/request/view/executive/records",
    RECORDS: "/executive/records",
    UPDATE_EXECUTIVES: "/executive/update",
    CREATE: "/executive/create",
    PUBLISH: "/executive/publish",
    SUGGEST: "/request/view/executive/suggestions",
    ACTIVITIES: "/executive/audit-trail",
    DELETE_EXEC: "/executive/delete",
  },
  ORGANIZATION: {
    PUBLISH: "/organization/publish",
    ORGANIZATION_ACTIONS: "/organization/all",
    AUDIT_TRAIL: "/organization/audit-trail",
    VIEW_ORGANIZATION: "/organization/view",
    UPDATE: "/organization/update",
    CREATE: "/organization/create",
    REQUEST_RECORDS: "/request/view/organization/records",
    RECORDS: "/organization/records",
    ACTIVITIES: "/organization/audit-trail",
    DELETE_ORG: "/organization/delete",
  },
  PARTNER: {
    CREATE_USER: "/partner/create",
    GET_PARTNERS: "/partner/retrieve",
    DELETE_PARTNER: "/partner/delete",
    SUSPEND_PARTNER: "/partner/suspend",
    UPDATE_PARTNER: "/partner/update",
  },
  DASHBOARD: {
    DASHDRAFT: "/dashboard/drafts",
    DASHSTATS: "/dashboard/stats",
    DASHEXECUTIVES: "/dashboard/executives",
    DASHORGANISATION: "/dashboard/organizations",
    AUTH_ME: "/auth/me",
  },
  REQUEST: {
    NEW_PROFILES: {
      ORGANIZATION: "/request/view/organization/new-profiles",
      EXECUTIVE: "/request/view/executive/new-profiles",
    },
    ADD_RECORDS: {
      ORGANIZATION: "/request/view/organization/records",
      ACCEPT_ORG_REC: "/request/accept/add-record/organization",
      ACCEPT_EXEC_REC: "/request/accept/add-record/executive",
      EXECUTIVE: "/request/view/executive/records",
    },
    SUGGESTIONS: {
      ORGANIZATION: "/request/view/organization/suggestions",
      ACCEPT_ORG_SUG: "/request/accept/suggestion/organization",
      ACCEPT_EXEC_SUG: "/request/accept/suggestion/executive",
      EXECUTIVE: "/request/view/executive/records",
    },
    QUESTIONS: {
      ORGANIZATION: "/request/view/organization/suggestions",
      EXECUTIVE: "/request/view/executive/suggestions",
    },
    VIEW_SINGLE_REQUEST: "/request/view/single",
    COUNT_ORGANIZATION_REQUEST: "/request/organization/data",
    COUNT_EXECUTIVE_REQUEST: "/request/executive/data",

    ACCEPT_REQUEST: "/request/accept/exec-org",
    DECLINE_REQUEST: "/request/decline",
    DELETE_REQUEST: "/request/delete",
  },
  WORKSPACE: {
    GET_ALL_MEMBERS: "/workspace/admin/all-members",
    REMOVE_USER: "/workspace/delete-member",
    MAKE_ADMIN: "/workspace/make-admin",
    MAKE_MEMBER: "/workspace/make-member",
    INVITE_MEMBER: "/workspace/invite",
    VERIFY_INVITE_LINK: "/workspace/invite/verify",
    JOIN: "/workspace/join",
    GET_MEMBER: "/workspace/admin/single-member",
    DRAFTS: "/workspace/admin/single-member/drafts",
    ORGANIZATION: "/workspace/admin/single-member/organizations",
    EXECUTIVE: "/workspace/admin/single-member/executives",
    UPDATE_PROFILE: "/auth/me/update",
  },
  UPLOADS: "/upload/files",
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
