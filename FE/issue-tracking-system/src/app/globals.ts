import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    loggedIn: boolean = false;

    public sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
}