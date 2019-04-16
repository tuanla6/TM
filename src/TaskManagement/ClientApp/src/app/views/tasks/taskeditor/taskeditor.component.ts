import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TaskInfo } from 'app/models/task';
import { Status } from 'app/models/Status';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertService, MessageSeverity } from '../../../services/message.service';
import { TaskService } from '../../../services/task.service';
import { Utilities } from '../../../services/utilities';

@Component({
  selector: 'app-taskeditor',
  templateUrl: './taskeditor.component.html',
  styleUrls: ['./taskeditor.component.css']
})
export class TaskeditorComponent implements OnInit {
  private taskEdit: TaskInfo;
  public formResetToggle = true;
  private isSaving = false;
  private isNewTask = false;
  private statuses : Status[] = [];
  @ViewChild('f')
  private form;
  @ViewChild('editorModal')
  editorModal: ModalDirective;
  @ViewChild('nameTemplate')
  nameTemplate: TemplateRef<any>;

  @ViewChild('descriptionTemplate')
  descriptionTemplate: TemplateRef<any>;

  @ViewChild('allStatus')
  private allStatus;

  @ViewChild('statusSelector')
  private statusSelector;
  constructor(private alertService: AlertService, private taskService: TaskService) { }
  public changesSavedCallback: () => void;
  public changesFailedCallback: () => void;
  public changesCancelledCallback: () => void;
  ngOnInit() {
    this.taskService.getStatuses().subscribe(statuses => this.onStatusDataLoadSuccessful(statuses),
      error => this.onStatusDataLoadFailed(error));
  }
  private onStatusDataLoadSuccessful(statuses: Status[]) {
    this.alertService.stopLoadingMessage();    
    this.statuses = statuses;
  }
  private onStatusDataLoadFailed(error: any) {
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Load Error',
      `Unable to retrieve user data from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      MessageSeverity.error, error);    
  }
  newTask() {
    this.isNewTask = true;
    this.taskEdit = new TaskInfo();
    return this.taskEdit;
  }
  resetForm(replace = false) {

    if (!replace) {
      this.form.reset();
    }
    else {
      this.formResetToggle = false;

      setTimeout(() => {
        this.formResetToggle = true;
      });
    }
  }
  private save() {
    this.isSaving = true;
    this.alertService.startLoadingMessage('Saving changes...');

    if (this.isNewTask) {
      this.taskService.addNewTask(this.taskEdit).subscribe(task => this.saveSuccessHelper(task), error => this.saveFailedHelper(error));
    }
    else {
    //  this.accountService.updateUser(this.userEdit).subscribe(response => this.saveSuccessHelper(), error => this.saveFailedHelper(error));
    }
  }
  private showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }
  private saveSuccessHelper(task?: TaskInfo) {    
    
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    
    //this.showValidationErrors = false;  
    this.resetForm();



    if (this.isNewTask) {
        this.alertService.showMessage('Success', `This task was created successfully`, MessageSeverity.success);
      }
      //else if (!this.isEditingSelf) {
      //  this.alertService.showMessage('Success', `Changes to user \"${this.user.userName}\" was saved successfully`,
      //    MessageSeverity.success);
      //}
    

    //if (this.isEditingSelf) {
    //  this.alertService.showMessage('Success', 'Changes to your User Profile was saved successfully', MessageSeverity.success);
    //  this.refreshLoggedInUser();
    //}

    //this.isEditMode = false;


    if (this.changesSavedCallback)
      this.changesSavedCallback();
  } 
  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.stopLoadingMessage();
    this.alertService.showStickyMessage('Save Error', 'The below errors occured whilst saving your changes:', MessageSeverity.error, error);
    this.alertService.showStickyMessage(error, null, MessageSeverity.error);

    if (this.changesFailedCallback)
      this.changesFailedCallback();
  }
}
