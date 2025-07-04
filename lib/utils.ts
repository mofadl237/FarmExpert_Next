import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";
 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SetLocal =  (cookie: string) => {
  localStorage.setItem('token',cookie)
};
export const getToken =  ():string|null => {
    return localStorage.getItem('token')
};
export const removeToken =  () => {
    return localStorage.removeItem('token')
};
