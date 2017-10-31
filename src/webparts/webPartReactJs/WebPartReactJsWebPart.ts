import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WebPartReactJsWebPartStrings';
import WebPartReactJs from './components/WebPartReactJs';
import WebPartReactJSEdit from './components/WebPartReactJSEdit';
import { IWebPartReactJsProps } from './components/IWebPartReactJsProps';
import { css } from 'office-ui-fabric-react';
import * as jquery from 'jquery';

export interface IWebPartReactJsWebPartProps {
  description: string;
  currentstate: string;
  Title:string;
} 

export default class WebPartReactJsWebPart extends BaseClientSideWebPart<IWebPartReactJsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IWebPartReactJsProps > = React.createElement(
      WebPartReactJs,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl,
        currentStat: this.properties.currentstate,
        Title: this.properties.Title      
      } 
       
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
