import { ObservableConceptsPage } from './app.po';

describe('observable-concepts App', () => {
  let page: ObservableConceptsPage;

  beforeEach(() => {
    page = new ObservableConceptsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
