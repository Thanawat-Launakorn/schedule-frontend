export interface ISchedulePost {
  calendar: string;
  user: Array<number>;
  dopay: string;
  howmuch?: number;
}

export interface IScheduleRandom {
  id: number;
  date: string;
  createAt: string;
  deleteAt: null;
  UpdateAt: string;
}

export interface IScheduleUpdate {
  calendar: number;
  user: number;
  doPay: string;
  howMuch: number;
}

export interface User {
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
  schedule: IScheduleGet[];
}

export interface Calendar {
  id: number;
  date: string;
  createAt: string;
  deleteAt: null;
  UpdateAt: string;
  schedule: IScheduleGet[];
}

export interface IScheduleGet {
  id: number;
  userId: number;
  calendarId: number;
  dopay: string;
  howmuch: number;
  createAt: string;
  deleteAt: null;
  UpdateAt: string;
  user?: User;
  calendar?: Calendar;
}

export interface User {
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
  Schedule: IScheduleGetAll[];
}

export interface Calendar {
  id: number;
  date: string;
  createAt: string;
  deleteAt: null;
  UpdateAt: string;
  Schedule: IScheduleGetAll[];
}

export interface IScheduleGetAll {
  id: number;
  userId: number;
  calendarId: number;
  dopay: Dopay;
  howmuch: number;
  createAt: string;
  deleteAt: null;
  UpdateAt: string;
  user?: User | null;
  calendar?: Calendar;
}

export enum Dopay {
  Do = "Do",
  Pay = "Pay",
}
