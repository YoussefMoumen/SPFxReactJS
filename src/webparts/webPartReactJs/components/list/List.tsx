import * as React from 'react';
import styles from '../../assets/style/style.module.scss';
//Import WebPart Props and State
import { IProps } from '../../model/IProps';
import { IState } from '../../model/IState';

export default class Listing extends React.Component<any, IState> {

    public constructor(props  , state ){  
        super(props); 
    }

    public render(): React.ReactElement<IProps> {
        let {items,viewDetail,viewUpdate,deleteItem,searchTerm,currentStat}= this.props;        
        return (
            <div className={styles.Table}>  
              <div className={styles.Heading}>  
                <div className={styles.Cell}>Title</div>  
                <div className={styles.Cell}>Created</div>  
                <div className={styles.Cell}>Author</div>
                <div className={styles.Cell}>Action</div>    
              </div>  
                {items.filter(searchTerm(currentStat.searchTerm)).map((item,key)=>{                      
                    
                  return (<div className={styles.Row} key={key}>  
                      <div className={styles.Cell}>{item.Title}</div>  
                      <div className={styles.Cell}>{item.Created}</div>  
                      <div className={styles.Cell}>{item.Author.Title}</div>
                      <div className={styles.Cell}>                      
                      <i id="ShowItem" onClick={() => viewDetail(item.Id)} className="ms-Icon ms-Icon--GroupedList" aria-hidden="true"></i>
                      <i id="UpdateItem" onClick={() => viewUpdate(item.Id)} className="ms-Icon ms-Icon--Edit" aria-hidden="true"></i> 
                      <i id="DeleteItem" onClick={() => deleteItem(item.Id)} className="ms-Icon ms-Icon--Delete" aria-hidden="true"></i>                   
                      </div>
                    </div>);  
                })}  
              </div>
        );
      }
}