import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private server: string = "http://localhost:420/";

  constructor(private http: HttpClient) { }

  createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'})
    };
  }

  getTickets() {
    return this.http.get(this.server + 'tickets');
  }

  getTicketDetails(id: string) {
    return this.http.get(this.server + 'tickets/' + id);
  }

  getProducts() {
    return this.http.get(this.server + 'products');
  }

  getProductParts(productId: string) {
    return this.http.get(this.server  + 'products/' + productId + '/parts');
  }

  getProductDetails(id: string) {
    return this.http.get(this.server + 'products/' + id);
  }

  registerProduct(product) {
    return this.http.post('/products', product, this.generateHeaders());
  }

  createProductPart(productId, productPart) {
    return this.http.post('/products/' + productId + '/parts', productPart, this.generateHeaders());
  }

  getTasks(ticketId: string) {
    return this.http.get('/tickets/' + ticketId + '/tasks');
  }
}
          