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

export interface IErrorResponse {
  data: {
    message: string;
  };
}
export interface IRequest{
    id : number ;
    email:string;
    farmName :string;
    phoneNumber:string;
    completed ?:boolean;
    createdAt?:Date ;
    
}
export interface IRequestContact{

    email:string;
    farmName :string;
    phoneNumber:string;
    
    
}