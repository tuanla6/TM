import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { TaskEndpoint } from './task-endpoint.service';
import { AuthService } from './auth.service';
//import { User } from '../models/user';
//import { Role } from '../models/role.model';
//import { Permission, PermissionNames, PermissionValues } from '../models/permission.model';
//import { UserEdit } from '../models/user-edit.model';
import { TaskInfo } from '../models/task';



//export type RolesChangedOperation = 'add' | 'delete' | 'modify';
//export interface RolesChangedEventArg { roles: Role[] | string[]; operation: RolesChangedOperation; }



@Injectable()
export class TaskService {

  //public static readonly roleAddedOperation: RolesChangedOperation = 'add';
  //public static readonly roleDeletedOperation: RolesChangedOperation = 'delete';
  //public static readonly roleModifiedOperation: RolesChangedOperation = 'modify';

  //private _rolesChanged = new Subject<RolesChangedEventArg>();


  constructor(private router: Router, private http: HttpClient, private authService: AuthService,
    private taskEndpoint: TaskEndpoint) {

  }


  //getUser(userId?: string) {
  //  return this.taskEndpoint.getUserEndpoint<User>(userId);
  //}

  //getUserAndRoles(userId?: string) {

  //  return forkJoin(
  //    this.taskEndpoint.getUserEndpoint<User>(userId),
  //    this.taskEndpoint.getRolesEndpoint<Role[]>());
  //}

  getTasks(page?: number, pageSize?: number) {

    return this.taskEndpoint.getTasksEndpoint<TaskInfo[]>(page, pageSize);
  }

  //getUsersAndRoles(page?: number, pageSize?: number) {

  //  return forkJoin(
  //    this.taskEndpoint.getUsersEndpoint<User[]>(page, pageSize),
  //    this.taskEndpoint.getRolesEndpoint<Role[]>());
  //}


  //updateUser(user: UserEdit) {
  //  if (user.id) {
  //    return this.taskEndpoint.getUpdateUserEndpoint(user, user.id);
  //  }
  //  else {
      //return this.accountEndpoint.getUserByUserNameEndpoint<User>(user.userName).pipe<User>(
      //  mergeMap(foundUser => {
      //    user.id = foundUser.id;
      //    return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
      //  }));
  //    return null;
  //  }
  //}


  addNewTask(task: TaskInfo) {
    return this.taskEndpoint.addNewTaskEndpoint<TaskInfo>(task);
 }


  //getUserPreferences() {
  //  return this.taskEndpoint.getUserPreferencesEndpoint<string>();
  //}

  //updateUserPreferences(configuration: string) {
  //  return this.taskEndpoint.getUpdateUserPreferencesEndpoint(configuration);
  //}


  //deleteUser(userOrUserId: string | UserEdit): Observable<User> {

  //  if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
  //    return this.taskEndpoint.getDeleteUserEndpoint<User>(<string>userOrUserId).pipe<User>(
  //      tap(data => this.onRolesUserCountChanged(data.roles)));
  //  }
  //  else {

  //    if (userOrUserId.id) {
  //      return this.deleteUser(userOrUserId.id);
  //    }
  //    else {
  //      return this.taskEndpoint.getUserByUserNameEndpoint<User>(userOrUserId.userName).pipe<User>(
  //        mergeMap(user => this.deleteUser(user.id)));
  //    }
  //  }
  //}


  //unblockUser(userId: string) {
  //  return this.taskEndpoint.getUnblockUserEndpoint(userId);
  //}


  //userHasPermission(permissionValue: PermissionValues): boolean {
  //  return this.permissions.some(p => p == permissionValue);
  //}


  //refreshLoggedInUser() {
  //  return this.authService.refreshLogin();
  //}




  //getRoles(page?: number, pageSize?: number) {

  //  return this.taskEndpoint.getRolesEndpoint<Role[]>(page, pageSize);
  //}


  //getRolesAndPermissions(page?: number, pageSize?: number) {

  //  return forkJoin(
  //    this.taskEndpoint.getRolesEndpoint<Role[]>(page, pageSize),
  //    this.taskEndpoint.getPermissionsEndpoint<Permission[]>());
  //}


  //updateRole(role: Role) {
  //  if (role.id) {
  //    return this.taskEndpoint.getUpdateRoleEndpoint(role, role.id).pipe(
  //      tap(data => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
  //  }
  //  else {
  //    return this.taskEndpoint.getRoleByRoleNameEndpoint<Role>(role.name).pipe(
  //      mergeMap(foundRole => {
  //        role.id = foundRole.id;
  //        return this.taskEndpoint.getUpdateRoleEndpoint(role, role.id);
  //      }),
  //      tap(data => this.onRolesChanged([role], AccountService.roleModifiedOperation)));
  //  }
  //}


  //newRole(role: Role) {
  //  return this.taskEndpoint.getNewRoleEndpoint<Role>(role).pipe<Role>(
  //    tap(data => this.onRolesChanged([role], AccountService.roleAddedOperation)));
  //}


  //deleteRole(roleOrRoleId: string | Role): Observable<Role> {

  //  if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
  //    return this.taskEndpoint.getDeleteRoleEndpoint<Role>(<string>roleOrRoleId).pipe<Role>(
  //      tap(data => this.onRolesChanged([data], AccountService.roleDeletedOperation)));
  //  }
  //  else {

  //    if (roleOrRoleId.id) {
  //      return this.deleteRole(roleOrRoleId.id);
  //    }
  //    else {
  //      return this.taskEndpoint.getRoleByRoleNameEndpoint<Role>(roleOrRoleId.name).pipe<Role>(
  //        mergeMap(role => this.deleteRole(role.id)));
  //    }
  //  }
  //}

  //getPermissions() {

  //  return this.taskEndpoint.getPermissionsEndpoint<Permission[]>();
  //}


  //private onRolesChanged(roles: Role[] | string[], op: RolesChangedOperation) {
  //  this._rolesChanged.next({ roles: roles, operation: op });
  //}


  //onRolesUserCountChanged(roles: Role[] | string[]) {
  //  return this.onRolesChanged(roles, AccountService.roleModifiedOperation);
  //}


  //getRolesChangedEvent(): Observable<RolesChangedEventArg> {
  //  return this._rolesChanged.asObservable();
  //}



  //get permissions(): PermissionValues[] {
  //  return this.authService.userPermissions;
  //}

  //get currentUser() {
  //  return this.authService.currentUser;
  //}
}
