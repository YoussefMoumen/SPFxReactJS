import * as React from 'react';
import { IWebPartReactJsProps } from './IWebPartReactJsProps';
import * as pnp from 'sp-pnp-js';

export default class WebPartReactJSCreate extends React.Component<any,any> {

    public constructor(props:IWebPartReactJsProps , state ){  
        super(props); 
    }
    
    public render() {
        return (    
          <div>
            <input id="Title"  placeholder="Title"    />         
             <button id="AddItem"  type="submit" onClick={() => this.addItem()}>Add</button>
          </div>
        );
      }
      addItem(){
        pnp.sp.web.lists.getByTitle('List To test').items.add({    
            Title : document.getElementById('Title')["value"],
           });
            alert("Record with Title Name : "+ document.getElementById('Title')["value"] + " Added !");        
    
      }
}

        