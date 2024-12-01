import { z } from 'zod';
import { APIschema } from '../APISchema';

export class OrdersSchema extends APIschema {
    constructor() {
        super();
        this.createOrderSchema = () => {
            return z.object({
                created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/),
                items: z.array(
                    z.object({
                        item_uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
                        quantity: z.number().min(1).max(100),
                        total_price: z.number().min(0),
                    })
                ).min(1).max(10),
                status: z.enum(["open", "pending", "overdue", "canceled", "completed"]),
                total_price: z.number().min(0),
                updated_at: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z$/),
                user_uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36),
                uuid: z.string().regex(/[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}/).min(36).max(36)
            })
        },
        this.createOrderErrorSchema = () => {
            return z.object({
                code: z.number().refine((val) => val === 400),
                message: z.string().refine((val) => val.includes("Items with the following \"uuid\" are duplicated"))
            })
        }
    }
}