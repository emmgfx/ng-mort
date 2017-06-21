import { NgMortAppPage } from './app.po';

describe('ng-mort-app App', () => {
  let page: NgMortAppPage;

  beforeEach(() => {
    page = new NgMortAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
