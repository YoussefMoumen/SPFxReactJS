import * as React from 'react';
import { IWebPartReactJsProps } from './IWebPartReactJsProps';
import * as pnp from 'sp-pnp-js';

export default class WebPartReactJSCreate extends React.Component<any,any> {

    public constructor(props:IWebPartReactJsProps , state ){  
        super(props); 
    }
    
    public render() {
        console.log(this.props.action);        
        return (    
          <div>
            <input id="Title"  placeholder="Title"    />         
             <button id="AddItem"  type="submit" onClick={() => this.addItem()}>Add</button>
             <button id="returnList"  type="submit" onClick={() => this.returnList()}>Return</button>  
          </div>
        );
      }
      public addItem = () => {
          let title=document.getElementById('Title')["value"];
        pnp.sp.web.lists.getByTitle('List To test').items.add({    
            Title : title,
           }).then((newItem) => {
            console.log(newItem);
            alert("Record with Title Name : "+ title + " Added !");
            this.props.action();    
        });                                                              
      }
      private returnList(){
        this.props.action(true);
    }
}

        