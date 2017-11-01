import * as React from 'react';
import { IWebPartReactJsProps } from './IWebPartReactJsProps';
import {
    Spinner,
    SpinnerSize
  } from 'office-ui-fabric-react/lib/Spinner';

export default class WebpartReactJSLoading extends React.Component<any,any> {

    public constructor(props:IWebPartReactJsProps , state ){  
        super(props); 
    }
    public render() {
        return (    
          <div>
              <Spinner size={ SpinnerSize.large } label='Working On It...' ariaLive='assertive' />
          </div>
          
        );
      }      
}