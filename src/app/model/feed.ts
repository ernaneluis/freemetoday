import { FeedInfo } from './feed-info';
import { FeedEntry } from './feed-entry';

export interface Feed {
  info: FeedInfo, //feed matadata
  items: Array<FeedEntry> //feed item

}
