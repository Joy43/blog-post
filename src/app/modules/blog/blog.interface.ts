import { boolean, string } from "zod";

export type Tblog={
    id:string,
    title:string,
    content:string,
    author: object,
    isPublished: boolean,
   
}