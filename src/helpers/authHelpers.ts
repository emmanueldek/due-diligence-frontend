type TokenData = {
  auth: string;
  workspace: string;
};
export const setToken = (tokenData: TokenData) => {
  sessionStorage.setItem("token", JSON.stringify(tokenData));
};

export const getToken = (): TokenData | undefined => {
  if (typeof window === "undefined") return undefined;

  const tokenString = sessionStorage.getItem("token");

  if (!tokenString) return undefined;

  const token: TokenData | null = JSON.parse(tokenString);

  if (token) {
    return token;
  }

  return undefined;
};

export const removeToken = (arg: string) => {
  sessionStorage.removeItem(arg);
};

export const removeAuthToken = () => {
  const tokenData = getToken();
  if (tokenData) {
    const { workspace } = tokenData;
    setToken({ auth: "", workspace }); // Remove the 'auth' token
  }
};

export const setEmail = (email: string): void => {
  sessionStorage.setItem("email", email);
};

export const getEmail = (): string | null => {
  return sessionStorage.getItem("email");
};

export const setUserType = (userType: string): void => {
  sessionStorage.setItem("userType", userType);
};

export const getUserType = (): string | null => {
  return sessionStorage.getItem("userType");
};
