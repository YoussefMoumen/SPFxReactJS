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
import { ToastContainer, toast } from 'react-toastify';
import { log } from 'sp-pnp-js';

export default class WebPartReactJsWebPart extends BaseClientSideWebPart<IWebPartReactJsWebPartProps> {  
  private dropdownOptions: IPropertyPaneDropdownOption[] = [];
  private listsFetched: boolean;

  public render(): void {
    this.fetchLists().then((response) => {
      this.dropdownOptions = response;      
    });
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

  private fetchLists():Promise<IPropertyPaneDropdownOption[]>{    
    var options: Array<IPropertyPaneDropdownOption> = new Array<IPropertyPaneDropdownOption>();
    return pnp.sp.web.lists.filter('Hidden eq false').select("Title", "Id").get().then(r => {
      console.log("fetchLists", r);       
      r.map(x =>{
        options.push( { key: x.Id, text: x.Title });
      })    
      return options;      
    });
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

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
                  options: this.dropdownOptions,
                  selectedKey:this.dropdownOptions[1].key,
                }),
              ]
            }
          ]
        }        
      ]
    };
  }
}
