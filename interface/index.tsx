export interface  IFarm  {
    id: number,
    name: string,
    manager: {
      id: number,
      name: string,
      email: string,
    },
  };