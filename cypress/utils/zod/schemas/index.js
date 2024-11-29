import { GETusersSchema } from "./GETusers";

export const validators = {
    GETusers: () => new GETusersSchema()
}