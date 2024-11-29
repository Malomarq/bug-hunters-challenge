import {z} from 'zod';
import { APIschema } from '../APISchema';

export class ExampleSchema extends APIschema {
    constructor(){
        super();
        this.exampleStatus200Schema = () => {
            return z.object({});
        }
    }
}