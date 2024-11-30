import { GETusersSchema } from "./GETusers";
import { GETcategoriesUuidGamesSchema } from "./GETcategoriesUuidGames";
import { POSTusersSchema } from "./POSTusers";
import { POSTusersLoginSchema } from "./POSTusersLogin";
import { GETuserUuidSchema } from "./GETuserUuid";
import { PATCHusersUuidSchema } from "./PATCHusersUuid";
import { GETgamesSearchSchema } from "./GETgamesSearch";
import { POSTwishlistSchema } from "./POSTwishlist";
import { GETcartSchema } from "./GETcart";

export const validators = {
    GETusers: () => new GETusersSchema(),
    GETcategoriesUuidGames: () => new GETcategoriesUuidGamesSchema(),
    POSTusers: () => new POSTusersSchema(),
    POSTusersLogin: () => new POSTusersLoginSchema(),
    GETuserUuid: () => new GETuserUuidSchema(),
    PATCHusersUuid: () => new PATCHusersUuidSchema(),
    GETgamesSearch: () => new GETgamesSearchSchema(),
    POSTwishlist: () => new POSTwishlistSchema(),
    GETcart: () => new GETcartSchema()
};