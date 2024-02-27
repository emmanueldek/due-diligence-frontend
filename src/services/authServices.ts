import { setToken } from "@/helpers/authHelpers";
import { IForgotPassword, ILoginProps, IResetPassword, IWorkspaceProps } from "@/interface/authTypes";
import { TUserResponseSchema } from "@/interface/userCreation";
import recordsApi from "@/utils/axios";
import { handleApiError } from "@/utils/httpApiErrors";
import { BACKEND_URL } from "@/utils/urls";

export const loginAdmin = async (payload: ILoginProps) => {
  try {
    const { data } = await recordsApi.post(`${BACKEND_URL.VERSION.v1}/auth/login`, payload);
    setToken({ auth: data?.data?.auth, workspace: data?.data?.workspace });
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const joinWorkspace = async (payload: IWorkspaceProps) => {
  try {
    const { data } = await recordsApi.post(`${BACKEND_URL.VERSION.v1}/workspace/join`, payload);
    // setToken(data?.data?.token);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createNewPassword = async (payload: IResetPassword) => {
  try {
    console.log(payload);
    const result = await recordsApi.post(`${BACKEND_URL.VERSION.v1}/auth/reset-password?token=${payload?.token}`, {
      password: payload.password,
    });
    return result;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const forgotPassword = async (payload: IForgotPassword) => {
  try {
    const result = await recordsApi.post(`${BACKEND_URL.VERSION.v1}/auth/forgot-password`, payload);
    return result;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const resetPassword = async (payload: IResetPassword) => {
  try {
    console.log(payload);
    const result = await recordsApi.post(`${BACKEND_URL.VERSION.v1}/auth/reset-password`, payload);
    return result;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const currentUser = async () => {
  try {
    const result = await recordsApi.get(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.DASHBOARD.AUTH_ME}`);
    const data: TUserResponseSchema = result.data.data;
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createPartnerPassword = async (payload: any) => {
  try {
    const result = await recordsApi.patch(
      `${BACKEND_URL.VERSION.v1}/partner/create-password?id=${payload?.id}`,
      payload.data,
    );
    return result;
  } catch (error) {
    throw handleApiError(error);
  }
};
