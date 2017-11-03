import * as React from 'react';
import {
    Spinner,
    SpinnerSize
  } from 'office-ui-fabric-react/lib/Spinner';

export default class Loader extends React.Component<any,any> {

    public constructor(props , state ){  
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