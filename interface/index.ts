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

export interface IManagerAdd {
  name: string;
  email: string;
  password: string;
  farmId: number;
}

export interface IErrorResponse {
  data: {
    message: string;
  };
}
export interface IErrorResponseMessage {
  message: string;
}
export interface IRequest {
  id: number;
  email: string;
  farmName: string;
  phoneNumber: string;
  completed?: boolean;
  createdAt?: Date;
}
export interface IRequestContact {
  email: string;
  farmName: string;
  phoneNumber: string;
}
export interface IJwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  FarmId: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface IWorkerAdd {
  id?: number;
  name: string;
  nationalID: string;
  password: string;
  age: string;
  experience: string;
  specialty: string;
  phone: string;
  salary: string;
  email: string;
}
export interface IWorker {
  id: number;
  name: string;
  nationalID: string;
  password: string;
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
export interface ICattle {
  cattleID?: number;
  age: number;
  weight: number;
  gender: string;
  type: string;
}
export interface IMilk {
  id?: number;
  tagNumber: string;
  am?: number;
  pm?: number;
  total?: number;
  notes: string;
  date?: Date;
}
export interface ISendNotification {
  email: string;
  message: string;
  title: string;
}
// export interface IDataMilk {

//     date: string;
//     total: string;

// }
// export interface ICattleAdd{
//   cattleID?:number;
//   age:number;
//   weight:number;
//   Gender:string;
//   Type:string;
// }

export interface IAlert {
  id: number;
  userId: string;
  name: string;
  email: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
export interface IEvent {
  id?: number;
  eventType: string;
  tagNumber: number;
  weight?: number;
  notes?: string;
  medicine?: string;
  dosage?: string;
  withdrawalTime?: string;
  calfGender?: string;
  vaccineType?: string;
  date?: Date;
}

export interface PaginatedCattleResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  data: ICattle[];
}
export interface PaginatedMilkResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  data: IMilk[];
}
export interface IPaginatedEventResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  data: IEvent[];
}

export interface ICattleECommerce {
  productID?: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  farmName: string;
  type: string;
  age: number;
  Quantity?:number;
}
export interface ICattleECommerceResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  data: ICattleECommerce[];
}
export interface IMilkECommerce {
  milkProductID?: number;
  pricePerKg: number;
  totalQuantity: number;
  soldQuantity: number;
  remaining: number;
  farmName: string;
  productionDate: Date;
  notes: string;
  Quantity?:number;
}
export interface IMilkECommerceResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  data: IMilkECommerce[];
}
export interface ICattleAddSuccess {
  message: string;
  productID: number;
}

export interface IAddMilkECommerce {
  milkProductionID: number;
  pricePerKg: number;
}
