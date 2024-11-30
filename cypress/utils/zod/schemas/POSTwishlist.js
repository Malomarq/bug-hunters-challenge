import { z } from 'zod';
import { APIschema } from '../APISchema';

export class POSTwishlistSchema extends APIschema {
    constructor() {
        super();
        this.status200Schema = () => {
            return z.object({
                items: z.array(
                    z.object({
                        category_uuids: z.array(
                            z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
                        ),
                        price: z.number().min(0),
                        title: z.string().min(1).max(100),
                        uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36)
                    })
                ),
                user_uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
            })
        },
        this.removeItemSchema = () => {
            return z.object({
                items: z.array(
                    z.object({
                        category_uuids: z.array(
                            z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
                        ),
                        price: z.number().min(0),
                        title: z.string().min(1).max(100),
                        uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36)
                    })
                ).length(2),
                user_uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
            })
        }
    }
}