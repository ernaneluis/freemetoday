import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { FeedServiceService } from './feed-service.service';
import { Feed } from './model/feed';
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

           }, error => {
             console.log(error)
           });


 }

  addSlide(itemfeed)
  {
    // let newWidth = 1600 + this.slides.length ;
    let data = {
      // image: 'http://placekitten.com/' + newWidth + '/754',
      image: itemfeed.thumbnail,
      text: itemfeed.title
    };

    this.slides.push(data);
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
