import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class User {
  id!: number
  token?: string;
  username?: string;
  email?: string;
  roles?: string[];

}
