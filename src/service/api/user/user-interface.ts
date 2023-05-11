import { IPosition } from "../position/position-interface";

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  password: string;
  img?: string;
  tel: string;
  status?: string;
  positionId: number;
  firstname?: string;
  lastname?: string;
  position?: IPosition;
}

export interface IUserPost {
  id: string | number;
  name: string;
  email: string;
  password: string;
  img?: string;
  tel: string;
  positionId: number;
  firstname?: string;
  lastname?: string;
}

export interface IUserColumnType extends Omit<IUser, "password"> {
  createAt: string;
  firstName: string;
  lastName: string;
  positionId: number;
  position: IPosition;
}

export interface IUserSearch {
  email: string;
  name: string;
  tel: string;
  status?: string;
}

export interface IUserUpdatePassword {
  id: string | number;
  oldpassword: string;
  password: string;
}
