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
import Search from './Search';
import ReactTable from 'react-table';

import { ToastContainer, toast } from 'react-toastify';
import 'react-table/react-table.css';
import CRUDservice from '../services/CRUD';


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
      item: {
              "Title": "", 
              "Id": "",  
              "Created":"",  
              "Author":{  
              "Title":""  
             }  
            },
      showIt:false,
      showCreate:false,
      showUpdate:false,
      loading:true,
      searchTerm:"",
    };

    this.Showitem = this.Showitem.bind(this);
    this.handler = this.handler.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.DeleteItem = this.DeleteItem.bind(this);
  }
  

//Life Cycle methods

  public render(): React.ReactElement<IProps> {  
    const columns = [{
      Header: 'Title',
      accessor: 'Title', // String-based value accessors!
    },{
      show: false,
      accessor: 'Id', // String-based value accessors!
    }, {
      Header: 'created',
      accessor: 'Created'
    }, {
      id: 'AuthorTitle', // Required because our accessor is not a string
      Header: 'Author Name',
      accessor: 'Author.Title' // Custom value accessors!
    }, {
      Header: 'Actions',       
      Cell: i =>  <span className='number'>
        <i id="ShowItem" onClick={() => this.Showitem(i.original.Id)} className="ms-Icon ms-Icon--GroupedList" aria-hidden="true"></i> 
        <i id="UpdateItem" onClick={() => this.updateStatus(i.original.Id)} className="ms-Icon ms-Icon--Edit" aria-hidden="true"></i> 
        <i id="DeleteItem" onClick={() => this.DeleteItem(i.original.Id)} className="ms-Icon ms-Icon--Delete" aria-hidden="true"></i>
        </span>
    }]  
    return (
      <div className={styles.listItemsForm}>
        {!this.state.showIt && !this.state.showCreate && !this.state.loading && !this.state.showUpdate &&
          (
            <div>
              <DefaultButton buttonType={3} className='ms-Button ms-Button--primary' id="Create" type="submit" onClick={() => this.createItem()} text={"Create Item"} />
              {/* <Search onChange={(e) => this.searchListItem(e)} value={this.state.searchTerm}>Search Item</Search> */}
              {/* <Listing items={this.state.items} viewDetail={this.Showitem} viewUpdate={this.updateStatus} deleteItem={this.DeleteItem} searchTerm={this.isSearched} currentStat={this.state}/> */}
              <ReactTable data={this.state.items} columns={columns} sortable = {true} resizable= {true} filterable= {true} loading= {false} defaultPageSize={10} />              
            </div>)
        }
        {this.state.loading && <Loader />}
        {this.state.showIt && <Detail currentStat={this.state} action={this.handler} />}
        {(this.state.showCreate || this.state.showUpdate) && <Create action={this.handler} CurrentState={this.state} CurrentList={this.props.Lists}/>}        
      </div>
    );
  }

  public componentDidMount(){
    var reactHandler = this;          
    new CRUDservice().getListByTitle('TestList').then((response) => {
      console.log("componentDidMount : ",response);      
      reactHandler.setState({  
                items: response  
              });
      reactHandler.setState({ loading: false });
     });;                    
  }

  componentWillReceiveProps(nextProps){
    var reactHandler = this;    
    new CRUDservice().getListById(nextProps.Lists).then((response) => {
      console.log("componentWillReceiveProps : ",response);      
      reactHandler.setState({  
                items: response  
              });
      reactHandler.setState({ loading: false });
     });
    //  this.setState({searchTerm: nextProps.value});                 
  }

//Life Cycle methods

//Functions 

    public handler = (isReturn:boolean=false) => {
      var reactHandler = this;
      
        reactHandler.setState ({showIt: false});
        reactHandler.setState ({showCreate: false});
        reactHandler.setState ({showUpdate: false}); 
        if(!isReturn){
        reactHandler.setState ({loading: true});
        new CRUDservice().getListById(this.props.Lists).then((response) => {
          console.log(response);
          reactHandler.setState({  
            items: response  
          });            
          reactHandler.setState ({loading: false});
         });        
    }    
  }

    public Showitem = (id:string) => {      
      let {Lists} = this.props;     
      var reactHandler = this;
      var t = new CRUDservice().getItemById(Lists,id);
      console.log("new CRUDservice().getItemById(Lists,id) : ", t );      
       new CRUDservice().getItemById(Lists,id).then(response => {
         console.log("Showitem() => response : ", response);         
          reactHandler.setState({ item: response});
          reactHandler.setState ({showIt: true});
          reactHandler.setState ({showCreate: false});
        });            
    }


    public updateStatus = (id:string) => {
      console.log("updateStatus() : ",this.state.showIt);
      let {Lists} = this.props;      
      var reactHandler = this;

      new CRUDservice().getItemById(Lists,id).then(response => {
          console.log("updateStatus() => response : ", response);         
          reactHandler.setState({item: response});  
          reactHandler.setState ({showIt: false});
          reactHandler.setState ({showCreate: false});
          reactHandler.setState ({showUpdate: true});   
      });                                   
    }

    public DeleteItem = (id:string) => {
      let {Lists} = this.props;
      var reactHandler = this;

      reactHandler.setState({ loading: true });      
      new CRUDservice().deleteItemById(Lists,id).then(_ => {
        new CRUDservice().getListById(this.props.Lists).then((response) => {
          console.log(response);          
          reactHandler.setState({  
                    items: response  
                  });                  
          reactHandler.setState({ loading: false });                                           
        });                              
      });    
    }

    public createItem(){
      this.setState ({showIt: false});
      this.setState ({showCreate: true});
      this.setState ({showUpdate: false});      
    }
    searchListItem(e){
      //  console.log(e);
      this.setState({searchTerm: e.target.value});     
    }
    //  isSearched = (searchTerm) => (item) => !searchTerm || item.Title.includes(searchTerm);    
    isSearched(searchTerm){
      searchTerm !== undefined ? searchTerm.toLowerCase() : !searchTerm;
      return function(item){
        return !searchTerm || (item.Title !== null ? item.Title.toLowerCase().includes(searchTerm) : !searchTerm);
      };
    }
//End Functions

}
