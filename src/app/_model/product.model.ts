export class Product {
  constructor(
    public pid: string,
    public username: string,
    public productName: string,
    public quantity: number,
    public process: string,
    public comment: string,
    public status: string,
    public date: Date,
    public cbutton: boolean,
    public dbutton: boolean
  ) {}
}
