import * as React from 'react';

export default class Search extends React.Component<any,any> {

    public constructor(props , state ){  
        super(props); 
    }
    public render() {
        let {onChange, children, value} = this.props;
        return (    
          <div>
              {children}
              <input type="text" onChange={onChange} value={value}/>
          </div>
          
        );
      }      
}