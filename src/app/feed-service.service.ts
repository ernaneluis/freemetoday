import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from './model/feed';

@Injectable()
export class FeedServiceService {
  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  constructor( private http: Http) {

  }


  getFeedContent(url: string): Observable<Feed>
  {
    return this.http.get(this.rssToJsonServiceBaseUrl + url)
            .map(this.extractFeeds)
            .catch(this.handleError);
  }

  private extractFeeds(res: Response): Feed
  {
    let data = res.json();

    let feed:Feed =  <Feed> { info: data.feed, items:data.items };

    for(var i=0;i<feed.items.length;i++)
    {

        var div = document.createElement('div');
	      div.innerHTML = feed.items[i].content;
        // console.log(div.innerHTML)
	      var imgs = div.querySelector("img");
        if(imgs)
        {
          console.log(imgs.src.toString())
          feed.items[i].thumbnail = imgs.src.toString()
        }
        else {
          feed.items[i].thumbnail = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=&w=350&h=235'
        }

    }
    // feed.info = data.feed;
    // feed.items = data.items;
    console.log("feed")
    console.log(feed)

    return feed ;
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

}
