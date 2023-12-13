export interface ILogin {
  email: string
  password: string
}

export interface IToken {
  access_token: string
  refresh_token: string
}

export interface ISession {
  id: number
  name: string
  email: string
  password: number
  role: 'customer' | 'admin'
  avatar: string
}

export type AuthContextType = {
  isAuthenticated: boolean;
  user: ISession | null;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
}