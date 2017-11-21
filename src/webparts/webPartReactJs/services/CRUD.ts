import * as pnp from 'sp-pnp-js';
import Guid from '@microsoft/sp-core-library/lib/Guid';

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

    public addItem(listId:string,Title:string):Promise<any> {        
        return pnp.sp.web.lists.getById(listId).items.add({    
            Title : Title,
           });
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