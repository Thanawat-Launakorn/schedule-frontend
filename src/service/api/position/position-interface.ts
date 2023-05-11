interface IPosition {
  id: number;
  position: string;
  createAt: string;
  deleteAt?: any;
  UpdateAt: string;
  user: User[];
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  img: string;
  tel: string;
  positionId: number;
  createAt: string;
  deleteAt?: any;
  UpdateAt: string;
  position: Position;
}

interface Position {
  id: number;
  position: string;
  createAt: string;
  deleteAt?: any;
  UpdateAt: string;
}
