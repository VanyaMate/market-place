import {Types} from "mongoose";

export type ObjectModel<T> = T & { _id: Types.ObjectId } & { __v: number };