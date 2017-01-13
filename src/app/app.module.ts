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

import {ShareButtonsModule} from "ng2-sharebuttons";
import {Pipe, PipeTransform} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser';
import { VideoCardComponent } from './video-card/video-card.component'
import {Router,Routes,RouterModule, NavigationEnd} from '@angular/router';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

const appRoutes: Routes = [
  // { path: 'news',   component: AppComponent },
  // { path: 'videos', component: AppComponent },
  // { path: '', component: AppComponent },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    StripHtmlTagsPipe,
    SafePipe,
    VideoCardComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ShareButtonsModule
  ],
  providers: [FeedServiceService, DataConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
