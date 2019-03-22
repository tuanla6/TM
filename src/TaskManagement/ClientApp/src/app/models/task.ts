export class TaskInfo {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(id?: string, taskName?: string, description?: string, userId?: string, assignedDate?: Date,
    dueDate?: Date, statusId?: number) {

    this.id = id;
    this.taskName = taskName;
    this.description = description;
    this.userId = userId;
    this.assignedDate = assignedDate;
    this.dueDate = dueDate;
    this.statusId = statusId;
  }  

  public id: string;
  public taskName: string;
  public description: string;
  public userId: string;
  public assignedDate: Date;
  public dueDate: Date;
  public statusId: number; 
  
}
