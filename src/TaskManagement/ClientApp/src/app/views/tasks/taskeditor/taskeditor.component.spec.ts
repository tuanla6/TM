import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskeditorComponent } from './taskeditor.component';

describe('TaskeditorComponent', () => {
  let component: TaskeditorComponent;
  let fixture: ComponentFixture<TaskeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
