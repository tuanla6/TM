import { TmPage } from './app.po';

describe('TM App', () => {
  let page: TmPage;

  beforeEach(() => {
    page = new TmPage();
  });

  it('should display application title: Task Management System', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Task Management System!');
  });
});
