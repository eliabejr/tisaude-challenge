export interface IUser {
  id: number,
  name: string,
  role: string,
  email: string,
  password: string,
  avatar?: string
}

export interface IUserDTO {
  name: string,
  email: string,
  password: string,
  avatar?: string
  role?: string
}