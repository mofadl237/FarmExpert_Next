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
  data ?: {
    message: string;
  };
  message?:string;
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
export interface IJwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  FarmId: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface IWorkerAdd{
  id?:number;
  name: string;
  nationalID: string;
  password:string;
  age: string;
  experience: string;
  specialty: string;
  phone: string;
  salary: string;
  email: string;
}
export interface IWorker{
  id:number;
  name: string;
  nationalID: string;
  password:string;
  age: string;
  experience: string;
  specialty: string;
  phone: string;
  salary: string;
  code: string;
  createdAt?: string;
  email: string;
  imagePath: File;
}
export interface ICattle{
  cattleID?:number;
  age:number;
  weight:number;
  gender:string;
  type:string;
}
// export interface ICattleAdd{
//   cattleID?:number;
//   age:number;
//   weight:number;
//   Gender:string;
//   Type:string;
// }