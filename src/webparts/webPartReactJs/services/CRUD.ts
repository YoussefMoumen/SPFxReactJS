import * as pnp from 'sp-pnp-js';

 export default class CRUDservice {

    constructor(){        
    }
    public getListByTitle(Title:string):Promise<any>
    {
        return pnp.sp.web.lists.getByTitle(Title).items.select("Title", "Id", "Created", "Author/Title").expand("Author").get();
    }

    public getListById(id:string):Promise<any>
    {
        return pnp.sp.web.lists.getById(id).items.select("Title", "Id", "Created", "Author/Title").expand("Author").get();
    }

    public getItemById(listId:string, itemId:string):Promise<any>
    {
        return pnp.sp.web.lists.getById(listId).items.getById(+itemId).get();
    }

    public updateItemById(listId:string, itemId:string):Promise<any>
    {
        return pnp.sp.web.lists.getById(listId).items.getById(+itemId).update({    
            // Title : title,
           });
    }

    public deleteItemById(listId:string, itemId:string)
    {
        return pnp.sp.web.lists.getById(listId).items.getById(+itemId).delete();
    }

} 