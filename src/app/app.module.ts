import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FeedServiceService } from './feed-service.service';
import { StripHtmlTagsPipe } from './pipe/strip-html-tags.pipe';
import { DataConfig } from './model/data-config';
@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    StripHtmlTagsPipe
  ],
  imports: [
    MaterialModule.forRoot(),
    CarouselModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FeedServiceService, DataConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
