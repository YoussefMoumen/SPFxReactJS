export interface IWebPartReactJSState{  
    items:[  
          {  
            "Title":string,  
            "Id":string,  
            "Created":string;  
            "Author":{  
              Title:string;  
            }  
          }];
          item:{"Title": "", 
          "Id": "",  
          "Created":"",  
          "Author":{  
            "Title":""  
          }  
        };
          showIt:boolean;
          showCreate:boolean;
  }