export interface ILoginProps {
  email: string;
  password: string;
}

export interface IWorkspaceProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  token: string | null;
}
