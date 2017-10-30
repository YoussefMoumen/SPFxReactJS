import * as React from 'react';
import { IWebPartReactJsProps } from './IWebPartReactJsProps';
export default class WebPartReactJSEdit extends React.Component<any,any> {

    public constructor(props:IWebPartReactJsProps , state ){  
        super(props); 
    }
    public render() {
        console.log(this.props.currentStat);
        return (    
          <div>
              <div>Title : {this.props.currentStat.item.Title}</div>
          </div>
        );
      }

}