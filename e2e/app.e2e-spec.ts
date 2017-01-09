import { FreemetodayPage } from './app.po';

describe('freemetoday App', function() {
  let page: FreemetodayPage;

  beforeEach(() => {
    page = new FreemetodayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
