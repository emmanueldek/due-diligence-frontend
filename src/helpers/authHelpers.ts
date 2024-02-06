type TokenData = {
  auth: string;
  workspace: string;
};
export const setToken = (tokenData: TokenData) => {
  localStorage.setItem("token", JSON.stringify(tokenData));
};

export const getToken = (): TokenData | undefined => {
  // if (typeof window === "undefined") return undefined;

  // if (!localStorage.getItem("token")) return undefined;

  // const token: TokenData | null = JSON.parse(localStorage.getItem("token"));
  // if (token) {
  //   return token;
  // }
  if (typeof window === "undefined") return undefined;

  const tokenString = localStorage.getItem("token");

  if (!tokenString) return undefined;

  const token: TokenData | null = JSON.parse(tokenString);

  if (token) {
    return token;
  }

  return undefined;
};

export const removeToken = (arg: string) => {
  localStorage.removeItem(arg);
};

export const removeAuthToken = () => {
  const tokenData = getToken();
  if (tokenData) {
    const { workspace } = tokenData;
    setToken({ auth: "", workspace }); // Remove the 'auth' token
  }
};

export const setEmail = (email: string): void => {
  localStorage.setItem("email", email);
};

export const getEmail = (): string | null => {
  return localStorage.getItem("email");
};

export const setUserType = (userType: string): void => {
  localStorage.setItem("userType", userType);
};

export const getUserType = (): string | null => {
  return localStorage.getItem("userType");
};
