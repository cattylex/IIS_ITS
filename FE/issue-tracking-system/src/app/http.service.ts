import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('https://api.openbrewerydb.org/breweries');
  }

  getProductDetails(id: string) {
    console.log('https://localhost:8000/products/'+id);
    return this.http.get('https://localhost:8000/products/'+id);
  }

  createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  getTickets() {
    return this.http.get('https://localhost:443/tickets');
  }
}
          