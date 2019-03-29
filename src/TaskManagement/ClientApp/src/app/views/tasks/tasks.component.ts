import { Component, OnInit, OnDestroy, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { AuthService } from '../../services/auth.service';
import { AlertService, MessageSeverity, MessageType } from '../../services/message.service';
import { AppTranslationService } from '../../services/app-translation.service';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { Utilities } from '../../services/utilities';
import { TaskService } from '../../services/task.service';
import { TaskInfo } from 'app/models/task';
import { TaskeditorComponent } from './taskeditor/taskeditor.component';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  public static readonly DBKeyTasks = 'task.task_list';

  rows = [];
  rowsCache = [];
  columns = [];
  editing = {};
  //taskEdit = {};
  isDataLoaded = false;
  loadingIndicator = true;
  formResetToggle = true;
  _currentUserId: string;
  _hideCompletedTasks = false;
  editedTask: TaskInfo;

  get currentUserId() {
    if (this.authService.currentUser)
      this._currentUserId = this.authService.currentUser.id;

    return this._currentUserId;
  }


  set hideCompletedTasks(value: boolean) {

    if (value) {
      this.rows = this.rowsCache.filter(r => !r.completed);
    }
    else {
      this.rows = [...this.rowsCache];
    }


    this._hideCompletedTasks = value;
  }

  get hideCompletedTasks() {
    return this._hideCompletedTasks;
  }


  @Input()
  verticalScrollbar = false;


  @ViewChild('statusHeaderTemplate')
  statusHeaderTemplate: TemplateRef<any>;

  @ViewChild('statusTemplate')
  statusTemplate: TemplateRef<any>;

  @ViewChild('nameTemplate')
  nameTemplate: TemplateRef<any>;

  @ViewChild('descriptionTemplate')
  descriptionTemplate: TemplateRef<any>;

  @ViewChild('actionsTemplate')
  actionsTemplate: TemplateRef<any>;

  @ViewChild('editorModal')
  editorModal: ModalDirective;
  @ViewChild('taskEditor')
  taskEditor: TaskeditorComponent;


  constructor(private alertService: AlertService, private translationService: AppTranslationService,
    private taskService: TaskService, private authService: AuthService) {

  }



  ngOnInit() {
    this.loadingIndicator = true;  


    const gT = (key: string) => this.translationService.getTranslation(key);

    this.columns = [
      {
        prop: 'completed', name: '', width: 30, headerTemplate: this.statusHeaderTemplate, cellTemplate: this.statusTemplate,
        resizeable: false, canAutoResize: false, sortable: false, draggable: false
      },
      { prop: 'taskname', name: gT('task.management.TaskName'), cellTemplate: this.nameTemplate, width: 200 },
      { prop: 'description', name: gT('task.management.Description'), cellTemplate: this.descriptionTemplate, width: 500 },
      {
        name: '', width: 80, cellTemplate: this.actionsTemplate, resizeable: false, canAutoResize: false, sortable: false,
        draggable: false
      }
    ];
    this.loadData();
  }

  ngOnDestroy() {
    //this.saveToDisk();
  }

  onEditorModalHidden() {
    this.taskEditor.resetForm(true);
  }

  fetch(cb) {
    let data = this.getData();

    if (data == null) {
      setTimeout(() => {

        data = this.getData();              

        cb(data);
      }, 1000);
    }
    else {
      cb(data);
    }
  }


  refreshDataIndexes(data) {
    let index = 0;

    for (const i of data) {
      i.$$index = index++;
    }
  }


  onSearchChanged(value: string) {
    this.rows = this.rowsCache.filter(r => Utilities.searchArray(value, false, r.name, r.description) ||
      value == 'important' && r.important || value == 'not important' && !r.important);
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }


  addTask() {
    this.formResetToggle = false;

    setTimeout(() => {
      this.formResetToggle = true;

      this.editedTask = this.taskEditor.newTask();
      this.editorModal.show();
    });
  }

  ngAfterViewInit() {

    this.taskEditor.changesSavedCallback = () => {
      this.loadData();
      this.editorModal.hide();
    };

    this.taskEditor.changesCancelledCallback = () => {
      this.editedTask = null;      
      this.editorModal.hide();
    };
  }

  save() {
    //this.rowsCache.splice(0, 0, this.taskEdit);
    //this.rows.splice(0, 0, this.taskEdit);
    this.refreshDataIndexes(this.rowsCache);
    this.rows = [...this.rows];

    //this.saveToDisk();
    this.editorModal.hide();
  }


  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
    this.rows = [...this.rows];

    //this.saveToDisk();
  }


  delete(row) {
    this.alertService.showDialog('Are you sure you want to delete the task?', MessageType.confirm, () => this.deleteHelper(row));
  }


  deleteHelper(row) {
    this.rowsCache = this.rowsCache.filter(item => item !== row);
    this.rows = this.rows.filter(item => item !== row);

    //this.saveToDisk();
  }

  getData() {
    return this.taskService.getTasks(-1, -1);
  }
  loadData() {
    this.alertService.startLoadingMessage();
    this.loadingIndicator = true;

    this.taskService.getTasks(-1, -1)
      .subscribe(tasks => this.onDataLoadSuccessful(tasks),
      error => this.onDataLoadFailed(error));
  }
  onDataLoadSuccessful(tasks: TaskInfo[]) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    tasks.forEach((task, index) => {
      (<any>task).index = index + 1;
    });

    this.rowsCache = [...tasks];
    this.rows = tasks;
  }
  onDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.loadingIndicator = false;

    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);
  }
  //saveToDisk() {
  //  if (this.isDataLoaded)
  //    this.localStorage.saveSyncedSessionData(this.rowsCache, `${TodoDemoComponent.DBKeyTodoDemo}:${this.currentUserId}`);
  //}
}
