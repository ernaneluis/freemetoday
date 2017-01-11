import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { FeedServiceService } from './feed-service.service';
import { Feed } from './model/feed';
import { FeedEntry } from './model/feed-entry';
// Add the RxJS Observable operators we need in this app.
// import './rxjs-operators';


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


  public myInterval:number = 50000; //1000 = 1s
  public noWrapSlides:boolean = false;
  public slides:any[] = [];
  public slidesSider:any[] = [];
  // public slidesSider:any;

  public activeSlideIndex: number;



  private feedUrl: string = encodeURIComponent('http://noticias.spotniks.com/feed/');
  private feeds: Array<Feed> = [];

  constructor(private _dialog: MdDialog,
              private _snackbar: MdSnackBar,
              private feedService: FeedServiceService) {
    // Update the value for the progress-bar on an interval.
    setInterval(() => {
      this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    }, 200);

    // this.slidesSider = {title: "", description:"", thumbnail:""}



  }

  ngOnInit() {
    this.refreshFeed();
  }

  private refreshFeed()
  {
      this.feedService.getFeedContent(this.feedUrl).subscribe(feed => {

             this.feeds.push(feed)
                console.log("this.feeds[0]")
             console.log(this.feeds[0].items[0])

             this.addSlide(this.feeds[0].items[0]);
             this.addSlide(this.feeds[0].items[1]);
             this.addSlide(this.feeds[0].items[2]);


             this.slidesSider.push(this.feeds[0].items[2]);
             this.slidesSider.push(this.feeds[0].items[4]);
             this.slidesSider.push(this.feeds[0].items[5]);

            //  this.slidesSider.title = this.feeds[0].items[2].title;
            //  this.slidesSider.description = this.feeds[0].items[2].description;
            //  this.slidesSider.thumbnail = this.feeds[0].items[2].thumbnail;
             console.log("this.slidesSider")
             console.log(this.slidesSider)

           }, error => {
             console.log(error)
           });


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
