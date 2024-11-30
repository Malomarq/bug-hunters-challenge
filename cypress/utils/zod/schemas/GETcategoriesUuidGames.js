import { z } from 'zod';
import { APIschema } from '../APISchema';

export class GETcategoriesUuidGamesSchema extends APIschema {
    constructor() {
        super();
        this.api10Schema = () => {
            return z.object({
                games: z.array(
                    z.object({
                        category_uuids: z.array(
                            z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
                        ),
                        price: z.number().min(0),
                        title: z.string().min(1).max(100),
                        uuid: z.string().refine(value => value === "77a94eec-38e0-4a08-a3d7-2be1007ef686", { message: "The UUID must be 77a94eec-38e0-4a08-a3d7-2be1007ef686" })
                    })
                ),
                meta: z.object({
                    total: z.number()
                })
            })
        }
    }
}