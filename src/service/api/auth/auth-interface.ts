export interface ISignin {
  email: string;
  password: string;
}

export interface IProfile {
  id: number;
  name: string;
  email: string;
  password: string;
  img: string;
  tel: string;
  positionId: number;
  createAt: string;
  deleteAt: null;
  UpdateAt: string;
}
