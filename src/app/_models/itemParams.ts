type orderItems = 'DESC' | 'ASC'
export type apiSearch = "images/search" | "favourites"

export default class ItemParams{
    pageNumber = 0;
    pageSize = 18;
    order : orderItems = "DESC";
    type: apiSearch = "images/search"
    breed_id?: string;
    category_ids?: number;
    mime_types?: string;
}