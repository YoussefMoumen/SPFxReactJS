import * as React from 'react';
import styles from '../assets/style/style.module.scss';

//Import WebPart Props and State
import { IProps } from '../model/IProps';
import { IState } from '../model/IState';

//Import Node Modules Libraries
import { css } from 'office-ui-fabric-react';
import * as jquery from 'jquery';
import * as pnp from 'sp-pnp-js';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { escape } from '@microsoft/sp-lodash-subset';

//Import Components

import Detail from './list/item/Detail';
import Create from './list/item/Create';
import Loader from './Loader';
import Listing from './list/List';

export default class WebPart extends React.Component<IProps, IState> {
  public constructor(props, state){  
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
      showUpdate:false,
      loading:true
    };
    this.Showitem = this.Showitem.bind(this);
    this.handler = this.handler.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  public componentDidMount(){
    var reactHandler = this;  
    // jquery.ajax({  
    //     url: `${this.props.siteurl}/_api/web/lists/getbytitle('List To test')/items?$select=Title,Id,Created,Author/Title&$expand=Author`,  
    //     type: "GET",  
    //     headers:{'Accept': 'application/json; odata=verbose;'},  
    //     success:(resultData) => {  
    //       /*resultData.d.results;*/  
    //       reactHandler.setState({  
    //         items: resultData.d.results  
    //       });
    //      this.setState({ loading: false });
    //     },  
    //     error : (jqXHR, textStatus, errorThrown) => {  
    //     }  
    // });
    pnp.sp.web.lists.getByTitle("List To test").items.select("Title", "Id", "Created", "Author/Title").expand("Author").get().then((response) => {
      console.log(response);
      
      reactHandler.setState({  
                items: response  
              });
       reactHandler.setState({ loading: false });
     });
     
  }
   
  public render(): React.ReactElement<IProps> {
    console.log(this);
    return (
      <div className={styles.listItemsForm}>
        {!this.state.showIt && !this.state.showCreate && !this.state.loading && !this.state.showUpdate &&
          (
            <div>
              <DefaultButton buttonType={3} className='ms-Button ms-Button--primary' id="Create" type="submit" onClick={() => this.createItem()} text={"Create Item"} />
              <Listing items={this.state.items} viewDetail={this.Showitem} viewUpdate={this.updateStatus} />
            </div>)
        }
        {this.state.loading && <Loader />}
        {this.state.showIt && <Detail currentStat={this.state} action={this.handler} />}
        {(this.state.showCreate || this.state.showUpdate) && <Create action={this.handler} CurrentState={this.state} />}        
      </div>
    );
  }

  public handler = (isReturn:boolean=false) => {
    var reactHandler = this;
    
      reactHandler.setState ({showIt: false});
      reactHandler.setState ({showCreate: false});
      reactHandler.setState ({showUpdate: false}); 
      if(!isReturn){
      reactHandler.setState ({loading: true});       
    jquery.ajax({  
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('List To test')/items?$select=Title,Id,Created,Author/Title&$expand=Author`,  
        type: "GET",  
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success:(resultData) => {  
          /*resultData.d.results;*/  
          reactHandler.setState({  
            items: resultData.d.results  
          });
         
          reactHandler.setState ({loading: false});       
        },  
        error : (jqXHR, textStatus, errorThrown) => {  
        }  
    });  
  }
    
}
  //EDit
  //Test Push from local
  public Showitem = (id:string) => {     
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

  public updateStatus(id:string){
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
          reactHandler.setState ({showIt: false});
          reactHandler.setState ({showCreate: false});
          reactHandler.setState ({showUpdate: true});           
        },  
        error : (jqXHR, textStatus, errorThrown) => {  
        }  
    });                       
  }

   public createItem(){
    this.setState ({showIt: false});
    this.setState ({showCreate: true});
    this.setState ({showUpdate: false});
   }
}
