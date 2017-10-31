import * as React from 'react';
import styles from './WebPartReactJs.module.scss';
import { IWebPartReactJsProps } from './IWebPartReactJsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IWebPartReactJSState } from './IWebPartReactJSState';
import { css } from 'office-ui-fabric-react';
import * as jquery from 'jquery';
import * as pnp from 'sp-pnp-js';

import WebPartReactJSEdit from './WebPartReactJSEdit';
import WebPartReactJSCreate from './WebPartReactJSCreate';


export default class WebPartReactJs extends React.Component<IWebPartReactJsProps, IWebPartReactJSState> {
  public constructor(props: IWebPartReactJsProps, state: IWebPartReactJSState){  
    super(props);  
    this.state = {  
      items: [  
        {  
          "Title": "",  
          "Id": "",  
          "Created":"",  
          "Author":{  
            "Title":""  
          }  
        }  
      ],
      item:{"Title": "", 
          "Id": "",  
          "Created":"",  
          "Author":{  
            "Title":""  
          }  
        },
      showIt:false,
      showCreate:false
    };
    this.Showitem = this.Showitem.bind(this);
    this.handler = this.handler.bind(this);
  }

  public componentWillMount(){
    var reactHandler = this;  
    jquery.ajax({  
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('List To test')/items?$select=Title,Id,Created,Author/Title&$expand=Author`,  
        type: "GET",  
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success:(resultData) => {  
          /*resultData.d.results;*/  
          reactHandler.setState({  
            items: resultData.d.results  
          });  
        },  
        error : (jqXHR, textStatus, errorThrown) => {  
        }  
    });  
  }
   
  public render(): React.ReactElement<IWebPartReactJsProps> {
    console.log(this);
    
    return (
      <div className={styles.listItemsForm}>  
      {!this.state.showIt && !this.state.showCreate &&
      (
        <div className={styles.Table}>  
          <div className={styles.Heading}>  
            <div className={styles.Cell}>Title</div>  
            <div className={styles.Cell}>Created</div>  
            <div className={styles.Cell}>Author</div>
            <div className={styles.Cell}>Action</div>    
          </div>  
            {this.state.items.map((item,key)=>{  
              return (<div className={styles.Row} key={key}>  
                  <div className={styles.Cell}>{item.Title}</div>  
                  <div className={styles.Cell}>{item.Created}</div>  
                  <div className={styles.Cell}>{item.Author.Title}</div>  
                  <div className={styles.Cell}>
                  <button id="ShowItem" type="submit" onClick={() => this.Showitem(item.Id)}>Show item details</button>
                  <button id="Create" type="submit" onClick={() => this.createItem()}>Create item</button>
                  </div>
                </div>);  
            })}  
          </div> )
      } 
        {this.state.showIt && <WebPartReactJSEdit  currentStat={this.state} action={this.handler}/>}
        {this.state.showCreate && <WebPartReactJSCreate  action={this.handler}/>}
      </div>
    );
  }
  handler() {
    this.setState ({showIt: false});
    this.setState ({showCreate: false});
}
  //EDit
  Showitem(id:string) {
     this.setState ({showIt: true});
     this.setState ({showCreate: false});
     var reactHandler = this;  
     jquery.ajax({  
         url: `${this.props.siteurl}/_api/web/lists/getbytitle('List To test')/items(${id})?$select=Title,Id,Created,Author/Title&$expand=Author`,  
         type: "GET",  
         headers:{'Accept': 'application/json; odata=verbose;'},  
         success:(resultData) => {  
           /*resultData.d.results;*/  
           reactHandler.setState({  
             item: resultData.d
           });  
         },  
         error : (jqXHR, textStatus, errorThrown) => {  
         }  
     });
     
   }
   createItem(){
    this.setState ({showIt: false});
    this.setState ({showCreate: true});
   }
}
