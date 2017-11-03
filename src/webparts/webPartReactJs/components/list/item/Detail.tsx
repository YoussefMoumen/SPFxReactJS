import * as React from 'react';
import { IProps } from '../../../model/IProps';
export default class Detail extends React.Component<any,any> {

    public constructor(props:IProps , state ){  
        super(props); 
    }
    public render() {
        console.log(this.props.currentStat);
         let {item}= this.props.currentStat;
                return (    
          <div>
              <div>Title : {item.Title}</div>
              <button id="AddItem"  type="submit" onClick={() => this.returnList()}>Return</button>
          </div>
          
        );
      }
      public returnList(){
          this.props.action(true);
      }

}