import { NgAngularAgendaPage } from './app.po';

describe('ng-angular-agenda App', function() {
  let page: NgAngularAgendaPage;

  beforeEach(() => {
    page = new NgAngularAgendaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
