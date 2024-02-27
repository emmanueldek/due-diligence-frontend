import recordsApi from "@/utils/axios";
import { handleApiError } from "@/utils/httpApiErrors";
import { BACKEND_URL } from "@/utils/urls";
import {
  IContractProps,
  ICreditHistoryProps,
  IEnvironComplianceProps,
  IFinancialProps,
  IInsuranceProps,
  ILegalProps,
  IManagementProps,
  IProfileProps,
  IReferenceProps,
  ISupplyChainInfo,
  ITaxProps,
  IOwnerShipStructure,
} from "@/interface/userCreation";

interface IUploadImagePayload {
  flags?: string; // Optional property
  imageFile: FormData; // Assuming you're working with a File object
}
interface IProfile {
  profile: IProfileProps;
}
interface ICREATEUSER {
  firstName: any;
  lastName: any;
  email: any;
  password?: any;
}

interface IFinance {
  financialStatements: IFinancialProps[];
}
interface IManagement {
  management: IManagementProps[];
}
interface ICredit {
  creditHistory: ICreditHistoryProps[];
}
interface ITax {
  taxCompliance: ITaxProps[];
}
interface ILegal {
  legalRegulatory: ILegalProps[];
}
interface IEnviron {
  environmentalCompliance: IEnvironComplianceProps[];
}
interface IContract {
  contractualObligations: IContractProps[];
}
interface IInsured {
  insuranceCoverage: IInsuranceProps[];
}
interface ISupplyChain {
  supplyChainInformation: ISupplyChainInfo[];
}
interface IReference {
  referencesReputation: IReferenceProps[];
}
interface IOwner {
  ownershipStructure: IOwnerShipStructure;
}
interface IOrgProps {
  flag?: string;
  orgId?: string;
  execOrgDocId?: string;
  data?:
    | IFinance
    | IProfile
    | IManagement
    | ICredit
    | ITax
    | ILegal
    | IEnviron
    | IContract
    | IInsured
    | ISupplyChain
    | IReference
    | IOwner;
}

interface IDeleteData {
  executiveIds?: string[];
  organizationIds?: string[];
}

export const orgPendingRequest = async (batch: number, flag: string, searchValue: string) => {
  try {
    if (searchValue) {
      const { data } = await recordsApi.get(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.NEW_PROFILES.ORGANIZATION}?search=${searchValue || ""}`,
      );
      return data;
    }
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.NEW_PROFILES.ORGANIZATION}?batch=${batch}&flag=${flag}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const orgSuggestion = async (batch: number, flag: string, searchValue: string) => {
  try {
    if (searchValue) {
      const { data } = await recordsApi.get(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.SUGGESTIONS.ORGANIZATION}?search=${searchValue || ""}`,
      );
      return data;
    }
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.SUGGESTIONS.ORGANIZATION}?batch=${batch}&flag=${flag}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const orgAuditTrail = async (batch: number) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.ACTIVITIES}?batch=${batch}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const orgRecord = async (batch: number, flag: string, searchValue: string) => {
  try {
    if (searchValue) {
      const { data } = await recordsApi.get(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.REQUEST_RECORDS}?search=${searchValue || ""}`,
      );
      return data;
    }
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.REQUEST_RECORDS}?batch=${batch}&flag=${flag}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getOrgDrafts = async (batch: number, flag: string, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.ORGANIZATION_ACTIONS}?batch=${batch}&flag=${flag}&search=${
        searchValue || ""
      }`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const useUploadImage = async (payload: IUploadImagePayload) => {
  try {
    const { data } = await recordsApi.post(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.UPLOADS}${payload?.flags ? `?flag=${payload?.flags}` : ""} `,
      payload?.imageFile,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createOrg = async (payload: IProfile) => {
  try {
    const { data } = await recordsApi.post(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.CREATE}`, payload);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateOrg = async (payload: IOrgProps) => {
  try {
    if (payload.execOrgDocId) {
      const { data } = await recordsApi.patch(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.UPDATE}?flag=${payload.flag}&organizationId=${payload.orgId}&execOrgDocId=${payload.execOrgDocId}`,
        payload.data,
      );
      return data;
    }
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.UPDATE}?flag=${payload.flag}&organizationId=${payload.orgId}`,
      payload.data,
    );
    console.log(payload.data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const pusblishOrg = async (payload: IOrgProps) => {
  try {
    if (payload.execOrgDocId) {
      const { data } = await recordsApi.patch(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.PUBLISH}?organizationId=${payload.orgId}&execOrgDocId=${payload.execOrgDocId}`,
        payload.data,
      );
      return data;
    }
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.PUBLISH}?organizationId=${payload.orgId}`,
      payload.data,
    );
    console.log(payload.data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getOrgData = async (flag: string, requestId: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.RECORDS}?flag=${flag}&organizationId=${requestId}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSingleRequest = async (requestID: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.VIEW_SINGLE_REQUEST}?requestId=${requestID}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const acceptRequest = async (requestID: string) => {
  try {
    const { data } = await recordsApi.post(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.ACCEPT_REQUEST}?execOrgDocId=${requestID}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSingleOrg = async (params: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.ORGANIZATION.VIEW_ORGANIZATION}?organizationId=${params}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const declineRequest = async (requestID: string) => {
  try {
    const { data } = await recordsApi.post(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.DECLINE_REQUEST}?requestId=${requestID}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const deleteProfile = async (payload: { data: IDeleteData; name: string; queryKey: string }) => {
  try {
    const { data } = await recordsApi.delete(
      `${BACKEND_URL.VERSION.v1}${
        payload.name === "org" ? BACKEND_URL.ORGANIZATION.DELETE_ORG : BACKEND_URL.EXECUTIVE.DELETE_EXEC
      }`,
      { data: payload.data },
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const acceptSugOrg = async (payload: IOrgProps) => {
  try {
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.SUGGESTIONS.ACCEPT_ORG_SUG}?sugDocId=${payload.orgId}&flag=${payload.flag}`,
      payload.data,
    );
    console.log(payload.data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const acceptRecOrg = async (payload: IOrgProps) => {
  try {
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.ADD_RECORDS.ACCEPT_ORG_REC}?recDocId=${payload.orgId}&flag=${payload.flag}`,
      payload.data,
    );
    console.log(payload.data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const orgCount = async () => {
  try {
    const { data } = await recordsApi.get(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.COUNT_ORGANIZATION_REQUEST}`);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createUser = async (payload: ICREATEUSER) => {
  try {
    const { data } = await recordsApi.post(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.PARTNER.CREATE_USER}`, payload);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateUser = async (payload: any) => {
  try {
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.PARTNER.UPDATE_PARTNER}?partnerId=${payload.id}`,
      payload.data,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const suspendUser = async (id: string) => {
  try {
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.PARTNER.SUSPEND_PARTNER}?partnerId=${id}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const { data } = await recordsApi.delete(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.PARTNER.DELETE_PARTNER}?partnerId=${id}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
