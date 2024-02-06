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

interface IDecline {
  requestId: string;
  data: {
    reason: string;
    description: string;
  };
  flag: string;
}

export const execPendingRequest = async (batch: number, flag: string, searchValue: string) => {
  try {
    if (searchValue) {
      const { data } = await recordsApi.get(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.NEW_PROFILES.EXECUTIVE}?search=${searchValue || ""}`,
      );
      return data;
    }
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.NEW_PROFILES.EXECUTIVE}?batch=${batch}&flag=${flag}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// export const orgSuggestion = async (batch: number, flag: string) => {
//   try {
//     const { data } = await recordsApi.get(
//       `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.SUGGESTIONS.ORGANIZATION}?batch=${batch}&flag=${flag}`,
//     );
//     return data;
//   } catch (error) {
//     throw handleApiError(error);
//   }
// };

export const getExecDrafts = async (batch: number, flag: string, searchValue: string) => {
  try {
    if (searchValue) {
      const { data } = await recordsApi.get(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.EXECUTIVES_ACTIONS}?flag=${flag}&search=${searchValue || ""}`,
      );

      return data;
    }
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.EXECUTIVES_ACTIONS}?batch=${batch}&flag=${flag}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const ExecAuditTrail = async (batch: number) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.ACTIVITIES}?batch=${batch}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getExecRecords = async (batch: number, flag: string, searchValue: string) => {
  try {
    if (searchValue) {
      const { data } = await recordsApi.get(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.REQUEST_RECORDS}?search=${searchValue || ""}`,
      );
      return data;
    }
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.REQUEST_RECORDS}?batch=${batch}&flag=${flag}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getExecSuggestions = async (batch: number, flag: string, searchValue: string) => {
  try {
    if (searchValue) {
      const { data } = await recordsApi.get(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.SUGGEST}?search=${searchValue || ""}`,
      );
      return data;
    }
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.SUGGEST}?batch=${batch}&flag=${flag}`,
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

export const createExec = async (payload: IProfile) => {
  try {
    const { data } = await recordsApi.post(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.CREATE}`, payload);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateExec = async (payload: IOrgProps) => {
  try {
    if (payload.execOrgDocId) {
      const { data } = await recordsApi.patch(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.UPDATE_EXECUTIVES}?flag=${payload.flag}&executiveId=${payload.orgId}&execOrgDocId=${payload.execOrgDocId}`,
        payload.data,
      );
      return data;
    }
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.UPDATE_EXECUTIVES}?flag=${payload.flag}&executiveId=${payload.orgId}`,
      payload.data,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getExecData = async (flag: string, requestId: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.RECORDS}?flag=${flag}&executiveId=${requestId}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSingleExecRequest = async (requestID: string) => {
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

export const getSingleExec = async (params: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.VIEW_EXECUTIVES}?executiveId=${params}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const declineRequest = async (payload: IDecline) => {
  try {
    const { data } = await recordsApi.post(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.DECLINE_REQUEST}?requestId=${payload.requestId}&flag=${payload.flag}`,
      payload.data,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteExec = async (payload: { executiveIds: string[] }) => {
  try {
    const { data } = await recordsApi.post(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.DELETE_EXEC}`, payload);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const acceptSugExec = async (payload: IOrgProps) => {
  try {
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.SUGGESTIONS.ACCEPT_EXEC_SUG}?sugDocId=${payload.orgId}&flag=${payload.flag}`,
      payload.data,
    );
    console.log(payload.data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const pusblishExec = async (payload: IOrgProps) => {
  try {
    if (payload.execOrgDocId) {
      const { data } = await recordsApi.patch(
        `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.PUBLISH}?executiveId=${payload.orgId}&execOrgDocId=${payload.execOrgDocId}`,
        payload.data,
      );
      return data;
    }
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.EXECUTIVE.PUBLISH}?executiveId=${payload.orgId}`,
      payload.data,
    );
    console.log(payload.data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const acceptRecExec = async (payload: IOrgProps) => {
  try {
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.ADD_RECORDS.ACCEPT_EXEC_REC}?recDocId=${payload.orgId}&flag=${payload.flag}`,
      payload.data,
    );
    console.log(payload.data);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const exeCount = async () => {
  try {
    const { data } = await recordsApi.get(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.COUNT_EXECUTIVE_REQUEST}`);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
