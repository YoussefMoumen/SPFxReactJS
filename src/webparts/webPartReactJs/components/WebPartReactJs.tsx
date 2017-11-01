import * as React from 'react';
import styles from './WebPartReactJs.module.scss';
import { IWebPartReactJsProps } from './IWebPartReactJsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IWebPartReactJSState } from './IWebPartReactJSState';
import { css } from 'office-ui-fabric-react';
import * as jquery from 'jquery';
import * as pnp from 'sp-pnp-js';

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

import WebPartReactJSEdit from './WebPartReactJSEdit';
import WebPartReactJSCreate from './WebPartReactJSCreate';
import WebpartReactJSLoading from './WebpartReactJSLoading';


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
      showCreate:false,
      loading:true
    };
    this.Showitem = this.Showitem.bind(this);
    this.handler = this.handler.bind(this);
  }

  public componentDidMount(){
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
    setTimeout(() => this.setState({ loading: false }), 1500);   
  }
   
  public render(): React.ReactElement<IWebPartReactJsProps> {
    console.log(this);
    return (
      <div className={styles.listItemsForm}>  
      {!this.state.showIt && !this.state.showCreate && !this.state.loading &&
      (
        <div>
          <DefaultButton buttonType={3} className='ms-Button ms-Button--primary' id="Create" type="submit"  onClick={() => this.createItem()} text={"Create Item"}/>
          <Icon iconName='CircleAddition' onClick={() => this.createItem()} className='ms-Icon ms-Icon--CircleAddition' iconType={1} />
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
                  </div>
                </div>);  
            })}  
          </div>
          </div> )
      }
       {this.state.loading && <WebpartReactJSLoading />}
        {this.state.showIt && <WebPartReactJSEdit  currentStat={this.state} action={this.handler}/>}
        {this.state.showCreate && <WebPartReactJSCreate action={this.handler}/>}
      </div>
    );
  }

  public handler = (isReturn:boolean=false) => {
    var reactHandler = this;
    if(isReturn){
      reactHandler.setState ({showIt: false});
      reactHandler.setState ({showCreate: false}); 
    }
    else{      
    jquery.ajax({  
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('List To test')/items?$select=Title,Id,Created,Author/Title&$expand=Author`,  
        type: "GET",  
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success:(resultData) => {  
          /*resultData.d.results;*/  
          reactHandler.setState({  
            items: resultData.d.results  
          });
          reactHandler.setState ({showIt: false});
          reactHandler.setState ({showCreate: false});  
        },  
        error : (jqXHR, textStatus, errorThrown) => {  
        }  
    });  
  }
    
}
  //EDit
  public Showitem(id:string) {     
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
           reactHandler.setState ({showIt: true});
           reactHandler.setState ({showCreate: false});
         },  
         error : (jqXHR, textStatus, errorThrown) => {  
         }  
     });
     
   }
   public createItem(){
    this.setState ({showIt: false});
    this.setState ({showCreate: true});
   }
}
