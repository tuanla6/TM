export class Status {
  constructor(id?: number, statusName?: string) {
    this.id = id;
    this.statusName = statusName;
  }
  public id: number;
  public statusName: string;
}
