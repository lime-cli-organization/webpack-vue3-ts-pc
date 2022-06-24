import {  Method } from "axios";

export interface ICustomResponse {
	readonly code: number;
	readonly msg: string;
	readonly total?: number;
	data: any;
}


export interface IPendingType{
	url?: string;
	method?: Method;
	params: any;
	data: any;
	cancel: (data: any)=>void;
}
