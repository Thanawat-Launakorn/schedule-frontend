export interface IUser {
  id: string | number;
  name: string;
  email: string;
  password: string;
  img: string;
  tel: string;
  position: number;
}

export interface IUserColumnType extends Omit<IUser, "password"> {
  createAt: string;
  firstName: string;
  lastName: string;
  positionId: number;
}
