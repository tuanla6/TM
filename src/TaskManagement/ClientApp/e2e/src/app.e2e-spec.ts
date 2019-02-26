import { AppPage } from './app.po';

describe('TaskManagement App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display application title: Task Management System', () => {
    page.navigateTo();
    expect(page.getAppTitle()).toEqual('Task Management System');
  });
});
