export interface IFarm {
  id: number;
  name: string;
  manager: {
    id: number;
    name: string;
    email: string;
  };
}

export interface IManager {
  id: number;
  name: string;
  email: string;

  farm: {
    id: number;
    name: string;
  };
}

export interface IManagerAdd{ 
   name: string;
  email: string;
  password:string;
  farmId:number;
}