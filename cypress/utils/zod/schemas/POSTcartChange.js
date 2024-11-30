import {z} from 'zod';
import { APIschema } from '../APISchema';

export class POSTcartChangeSchema extends APIschema {
    constructor(){
        super();
        this.status200Schema = () => {
            return z.object({
                items: z.array(
                    z.object({
                        item_uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
                        quantity: z.number().min(1).max(100),
                        total_price: z.number().min(0),
                    })
                ).min(1),
                total_price: z.number().min(0).optional(),
                user_uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36)
            });
        }
    }
}