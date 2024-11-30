import { z } from 'zod';
import { APIschema } from '../APISchema';

export class POSTusersSchema extends APIschema {
    constructor() {
        super();
        this.api3Schema = () => {
            return z.object({
                email: z.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).min(5).max(100),
                name: z.string().regex(/^\S.+$/).min(1).max(100),
                nickname: z.string().regex(/^[a-zA-Z0-9_.+-]+$/).min(2).max(100),
                avatar_url: z.string(),
                uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36)
            })
        }
    }
}