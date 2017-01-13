import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { FeedServiceService } from './feed-service.service';
import { Feed } from './model/feed';
import { FeedEntry } from './model/feed-entry';
import { DataConfig } from './model/data-config';
import {Router, NavigationEnd} from '@angular/router';

declare let ga: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  title = 'app works!';
  isDarkTheme: boolean = false;
  lastDialogResult: string;
  progress: number = 0;


  public myInterval:number = 5000; //1000 = 1s
  public noWrapSlides:boolean = false;
  public slides:any[] = [];
  public slidesSider:any[] = [];
  // public slidesSider:any;

  public activeSlideIndex: number;



  private feedUrl: string = encodeURIComponent('http://noticias.spotniks.com/feed/');
  // private feeds: Array<Feed> = [];

  public blogs: Array<FeedEntry> = [];
  public videos: Array<FeedEntry> = [];

  public footer:any;

  public linkToShare:string = "http://www.freeme.today"

  constructor(private _dialog: MdDialog,
              private _snackbar: MdSnackBar,
              private feedService: FeedServiceService,
              private dataConfig: DataConfig,
              public router: Router) {


    this.router.events.subscribe(event => {
       if (event instanceof NavigationEnd) {
         ga('set', 'page', event.urlAfterRedirects);
         ga('send', 'pageview');
         console.log("google A pageview: " + event.urlAfterRedirects);
       }
     });

    // Update the value for the progress-bar on an interval.
    // setInterval(() => {
    //   this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    // }, 200);

    // this.slidesSider = {title: "", description:"", thumbnail:""}

    this.footer = this.dataConfig.data

  }

  ngOnInit() {
    this.refreshFeed();
  }

  private refreshFeed()
  {

    this.feedService.getBlogContent();
    this.feedService.getVideoContent();

    setTimeout( () =>{

      var view = this.feedService.blogs;
      let size = view.length;

      this.addSlide(view[0]);
      this.addSlide(view[1]);
      this.addSlide(view[2]);

      this.slidesSider.push(view[3]);
      this.slidesSider.push(view[4]);
      this.slidesSider.push(view[5]);

      //o restante para a view
      this.blogs = view.slice(5, 20) //5 linhas de 3 noticias pois 5-20/5 = 3

      this.videos = this.feedService.videos.slice(0, 20) //5 linhas de 4 noticias
    }, 3000)


        //  this.feedService.getFeedContent(this.feedUrl).subscribe(feed => {
         //
        //         this.feeds.push(feed)
        //            console.log("this.feeds[0]")
        //         console.log(this.feeds[0].items[0])
         //
        //         this.addSlide(this.feeds[0].items[0]);
        //         this.addSlide(this.feeds[0].items[1]);
        //         this.addSlide(this.feeds[0].items[2]);
         //
         //
        //         this.slidesSider.push(this.feeds[0].items[2]);
        //         this.slidesSider.push(this.feeds[0].items[4]);
        //         this.slidesSider.push(this.feeds[0].items[5]);
         //
        //        //  this.slidesSider.title = this.feeds[0].items[2].title;
        //        //  this.slidesSider.description = this.feeds[0].items[2].description;
        //        //  this.slidesSider.thumbnail = this.feeds[0].items[2].thumbnail;
        //         console.log("this.slidesSider")
        //         console.log(this.slidesSider)
         //
        //       }, error => {
        //         console.log(error)
        //       });


 }

  addSlide(itemfeed)
  {
    // let newWidth = 1600 + this.slides.length ;
    // let data = {
    //   // image: 'http://placekitten.com/' + newWidth + '/754',
    //   image:  itemfeed.thumbnail,
    //   description:   itemfeed.description,
    //   title:  itemfeed.title
    // };

    this.slides.push(itemfeed);
  }

  openDialog() {
    let dialogRef = this._dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }

  private openLinkInBrowser(link) {
    window.open(link);
  }

}

@Component({
  template: `
    <p>This is a dialog</p>
    <p>
      <label>
        This is a text box inside of a dialog.
        <input #dialogInput>
      </label>
    </p>
    <p> <button md-button (click)="dialogRef.close(dialogInput.value)">CLOSE</button> </p>
  `,
})
export class DialogContent {
  constructor(public dialogRef: MdDialogRef<DialogContent>) {
  }
}
