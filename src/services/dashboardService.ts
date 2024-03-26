import recordsApi from "@/utils/axios";
import { handleApiError } from "@/utils/httpApiErrors";
import { BACKEND_URL } from "@/utils/urls";

export const getDashboardDrafts = async (batch: number, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.DASHBOARD.DASHDRAFT}?batch=${batch}&search=${searchValue || ""}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getDashboardExec = async (batch: number, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.DASHBOARD.DASHEXECUTIVES}?batch=${batch}&search=${searchValue || ""}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getDashboardStats = async () => {
  try {
    const { data } = await recordsApi.get(`${BACKEND_URL.VERSION.v1}${BACKEND_URL.DASHBOARD.DASHSTATS}`);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const getDashboardOrg = async (batch: number, searchValue: string) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.DASHBOARD.DASHORGANISATION}?batch=${batch}&search=${searchValue || ""}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteRequest = async (requestId: string) => {
  try {
    const { data } = await recordsApi.delete(
      `${BACKEND_URL.VERSION.v1}${BACKEND_URL.REQUEST.DELETE_REQUEST}?requestId=${requestId}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getShareHolderDetails = async ({ id }: any) => {
  try {
    const { data } = await recordsApi.get(
      `${BACKEND_URL.VERSION.v1}/${BACKEND_URL.SHAREHOLDER.GETSHAREHOLDER}?keyword=${id}`,
    );
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};
