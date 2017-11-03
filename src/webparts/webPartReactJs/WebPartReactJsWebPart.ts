import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WebPartReactJsWebPartStrings';
import WebPart from './components/WebPart';
import Detail from './components/list/item/Detail';
import { IProps,IWebPartReactJsWebPartProps } from './model/IProps';
import { css } from 'office-ui-fabric-react';
import * as jquery from 'jquery';



export default class WebPartReactJsWebPart extends BaseClientSideWebPart<IWebPartReactJsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IProps> = React.createElement(
      WebPart,
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
