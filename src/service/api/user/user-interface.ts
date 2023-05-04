export interface IUser {
  id: number | string;
  name: string;
  email: string;
  password: string;
  img: string;
  tel: string;
  position: IPosition;
}
export interface IPosition {
  position: string;
}
