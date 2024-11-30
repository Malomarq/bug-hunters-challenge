import { GETusersSchema } from "./GETusers";
import { GETcategoriesUuidGamesSchema } from "./GETcategoriesUuidGames";

export const validators = {
    GETusers: () => new GETusersSchema(),
    GETcategoriesUuidGames: () => new GETcategoriesUuidGamesSchema()
}