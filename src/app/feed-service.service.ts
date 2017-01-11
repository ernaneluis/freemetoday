import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from './model/feed';
import { FeedEntry } from './model/feed-entry';
import { DataConfig } from './model/data-config';




@Injectable()
export class FeedServiceService
{
  public blogs: Array<FeedEntry> = [];

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';
  private key: string = "iw4sffe4roaldbxu4twgrssnpfcwtm35oedepzsw"

  constructor( private http: Http, private dataConfig: DataConfig) {

  }

  getBlogContent()
  {
    if(this.dataConfig.data.blogs)
    {

          for(var i=0;i<this.dataConfig.data.blogs.length;i++)
          {
            var url = this.dataConfig.data.blogs[i].url;

            this.getFeedContent(url).subscribe(feedEntries => {

                  //  this.blogs.push(feedEntries)
                   this.blogs.push.apply(this.blogs, feedEntries);
                   this.blogs.sort(this.dynamicSort("-pubDate"));

                 }, error => {
                   console.log(error)
                 });
           }

      }
  }


  getFeedContent(url: string): Observable<Feed>
  {
    let fullURL = this.rssToJsonServiceBaseUrl + url + "&api_key=" + this.key + "&order_by=pubDate&order_dir=desc&count=3"
    console.log("Loading url " + fullURL)
    return this.http.get(fullURL)
            .map(this.extractFeeds)
            .catch(this.handleError);
  }

  private extractFeeds(res: Response): Array<FeedEntry>
  {
    let data = res.json();

    // let feed:Feed =  <Feed> { info: data.feed, items:data.items };
    let entries:Array<FeedEntry> = [];
    if(data.items)
    {
      console.log(data.feed.title)
      for(var i=0;i<data.items.length;i++)
      {

          let entry:FeedEntry = <FeedEntry>  {
              title: data.items[i].title, //titlo da noticia
              link: data.items[i].link, //link da noticia
              pubDate: data.items[i].pubDate, //data
              sourceName: data.feed.title,
              thumbnail: data.items[i].thumbnail,
              description:  data.items[i].description
         };

           if(!entry.thumbnail)
           {
               var div = document.createElement('div');
               div.innerHTML = data.items[i].content;
               // console.log(div.innerHTML)
               var imgs = div.querySelector("img");
               if(imgs)
               {
                 // console.log(imgs.src.toString())
                 entry.thumbnail = imgs.src.toString()
               }
               else {
                 entry.thumbnail = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=&w=350&h=235'
               }
           }


          if(data.items[i].description == "[…]")
          {
            //60 palavras
            entry.description = data.items[i].content.split(' ').slice(0, 60).join(" ") + " […]"
          }

          entries.push(entry)
      }
    }


    console.log("feed entries")
    console.log(entries)

    return entries;
  }

  private handleError (error: any)
  {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

}
