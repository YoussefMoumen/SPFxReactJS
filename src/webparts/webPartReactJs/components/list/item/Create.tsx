import * as React from 'react';
import { IProps } from '../../../model/IProps';
import * as pnp from 'sp-pnp-js';

export default class Create extends React.Component<any,any> {

    public constructor(props:IProps , state ){  
        super(props); 
    }
    
    public render() {        
        return (    
          <div>
            <input id="Title"  placeholder="Title"    />         
             <button id="AddItem"  type="submit" onClick={() => this.addItem()}>Add</button>
             <button id="UpdateItem" type="submit" onClick={() => this.updateItem(this.props.CurrentState.item.Id)}>Update</button>
             <button id="returnList"  type="submit" onClick={() => this.returnList()}>Return</button>  
          </div>
        );
      }
      public componentDidMount(){
          //Logic of item is empty or not for show input empty or not and button (add or update)
          let {CurrentState} = this.props;

          document.getElementById('AddItem').style.visibility = "hidden";
          document.getElementById('UpdateItem').style.visibility = "hidden";

          if(CurrentState.showUpdate == true){
            document.getElementById('Title')["value"] = this.props.CurrentState.item.Title;
            document.getElementById('UpdateItem').style.visibility = "visible";
          }
          else{
            document.getElementById('AddItem').style.visibility = "visible";
          }
      }
      public addItem = () => {
        let {CurrentList} = this.props;
        let title=document.getElementById('Title')["value"];
        pnp.sp.web.lists.getById(CurrentList).items.add({    
            Title : title,
           }).then((newItem) => {
            console.log(newItem);
            // alert("Record with Title Name : "+ title + " Added !");
            this.props.action();    
        });                                                              
      }

      private returnList(){
        this.props.action(true);
    }
    public updateItem = (id:string) => {
      let {CurrentList} = this.props;
        var reactHandler = this;
          let title=document.getElementById('Title')["value"];
          pnp.sp.web.lists.getById(CurrentList).items.getById(+id).update({    
            Title : title,
           }).then((newItem) => {
            console.log(newItem);
            // alert("Record with Title Name : "+ title + " Updated !");
            this.props.action();   
        });    
    }
}

        