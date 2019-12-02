import { Injectable } from "@angular/core";

export interface LoggedUser {
  id: number;
  logged_as: string;
  token: string;
}

@Injectable()
export class Globals {
  loggedIn: boolean;
  loggedUser: LoggedUser;
  loggedUsername: string;
  userLevel: number;

  public sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  public isLogged() {
    let loggedIn = localStorage.getItem("loggedIn");
    return loggedIn == "true";
  }

  public setUserLevel() {
    this.loggedIn = this.isLogged();
    this.loggedUsername = localStorage.getItem("loggedUsername");

    let loggedUser: LoggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    this.loggedUser = loggedUser;
    if (loggedUser == undefined) this.userLevel = 0;
    else{

      switch(loggedUser.logged_as){
        case "admin":
          this.userLevel = 5;
          break;
        case "executive":
          this.userLevel = 4;
          break;
        case "manager":
          this.userLevel = 3;
          break;
        case "employee":
          this.userLevel = 2;
          break;
        case "customer":
          this.userLevel = 1;
          break;
        default:
          this.userLevel = 0;
          break;
      }
    }
  }

  logoutUser() {
    this.loggedIn = false;
    this.loggedUser = null;
    this.loggedUsername = null;
    this.userLevel = 0;
    localStorage.clear();
  }
}