import { Injectable } from "@angular/core";

export interface LoggedUser {
  logged_as: string;
  token: string;
}

@Injectable()
export class Globals {
    loggedIn: boolean;
    loggedUsername: string;
    loggedUser: LoggedUser;

    public sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
}