import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
} from '@microsoft/sp-webpart-base';

import * as strings from 'WebPartReactJsWebPartStrings';
import WebPart from './components/WebPart';
import Detail from './components/list/item/Detail';
import { IProps,IWebPartReactJsWebPartProps } from './model/IProps';
import { css } from 'office-ui-fabric-react';
import * as jquery from 'jquery';
import * as pnp from 'sp-pnp-js';



export default class WebPartReactJsWebPart extends BaseClientSideWebPart<IWebPartReactJsWebPartProps> {  
  private dropdownOptions: IPropertyPaneDropdownOption[];
  public render(): void {
    const element: React.ReactElement<IProps> = React.createElement(
      WebPart,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl,
        currentStat: this.properties.currentstate,
        Title: this.properties.Title,
        Lists: this.properties.Lists          
      } 
       
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private fetchLists(): Promise<IPropertyPaneDropdownOption[]> {
    
    var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();

    return jquery.ajax({  
      url: `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/?$filter=Hidden eq false`,  
      type: "GET",  
      headers:{'Accept': 'application/json; odata=verbose;'},  
      success:(resultData) => {  
        /*resultData.d.results;*/  
        resultData.d.results.map((item,key)=>{
          options.push( { key: item.Id, text: item.Title });
          console.log(options);
          return options;                    
        });   
         
      },  
      error : (jqXHR, textStatus, errorThrown) => {  
      }  
  }); 
  
  //   return pnp.sp.web.lists.select("Title", "Id").get().then(r => {
  //     console.log(r.Title);
  //     console.log(r.Id);
  //     var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
  //     options.push( { key: r.Id, text: r.Title });
  //     console.log(options);
  //     return options;      
  // });
  
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    this.fetchLists().then((response) => {
      console.log(response.toString());      
      this.dropdownOptions = {...response};
      console.log(this.dropdownOptions);
      // now refresh the property pane, now that the promise has been resolved..
      this.onDispose();
    });
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneDropdown('Lists', {
                  label: 'Dropdown',
                  options: this.dropdownOptions
                }),
              ]
            }
          ]
        }        
      ]
    };
  }
}
