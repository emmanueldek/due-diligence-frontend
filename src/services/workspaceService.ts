import recordsApi from "@/utils/axios";
import { handleApiError } from "@/utils/httpApiErrors";
import { BACKEND_URL } from "@/utils/urls";

interface INewMember {
  email: string;
  role: string;
}
interface INewMemberList {
  invitees: INewMember[];
}

interface IProfile {
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}
export const getAllWorkspaceMembers = async (batch: number, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.GET_ALL_MEMBERS}?batch=${batch}&search=${searchValue || ""}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getAllPartners = async (batch: number, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.PARTNER.GET_PARTNERS}?batch=${batch}&search=${searchValue || ""}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const removeMember = async (adminId: string) => {
  try {
    const { data } = await recordsApi.delete(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.REMOVE_USER}?userId=${adminId}`,
    );

    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const makeAdmin = async (userId: string) => {
  try {
    const { data } = await recordsApi.post(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.MAKE_ADMIN}?userId=${userId}`,
    );

    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const makeMember = async (userId: string) => {
  try {
    const { data } = await recordsApi.post(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.MAKE_MEMBER}?userId=${userId}`,
    );

    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const inviteMember = async (payload: INewMemberList) => {
  try {
    const { data } = await recordsApi.post(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.INVITE_MEMBER}`, payload);

    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSingleWorkspace = async (userId: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.GET_MEMBER}?userId=${userId}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const workspaceDrafts = async (batch: number, userId: string, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.DRAFTS}?userId=${userId}&batch=${batch}&search=${
        searchValue || ""
      }`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const workspaceOrganization = async (batch: number, userId: string, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.ORGANIZATION}?userId=${userId}&batch=${batch}&search=${
        searchValue || ""
      }`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const workspaceExecutive = async (batch: number, userId: string, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.EXECUTIVE}?userId=${userId}&batch=${batch}&search=${
        searchValue || ""
      }`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWorkspaceInvite = async (params: string) => {
  try {
    const { data } = await recordsApi.post(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.VERIFY_INVITE_LINK}?token=${params}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const editProfile = async (payload: IProfile) => {
  try {
    const { data } = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.WORKSPACE.UPDATE_PROFILE}`,
      payload,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
