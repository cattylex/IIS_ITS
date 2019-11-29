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
    return this.http.get('/api/tickets');
  }

  getTicketDetails(id: string) {
    return this.http.get('/api/tickets/' + id);
  }

  getProducts() {
    return this.http.get('/api/products');
  }

  getProductParts(productId: string) {
    return this.http.get('/api/products/' + productId + '/parts');
  }

  getProductDetails(id: string) {
    return this.http.get('/api/products/' + id);
  }

  getProductTickets(productId: string) {
    return this.http.get('/api/products/' + productId + '/tickets');
  }

  registerProduct(product) {
    return this.http.post('api/products', product, this.generateHeaders());
  }

  deleteProduct(productId: string) {
    return this.http.delete('/api/products/' + productId);
  }

  createProductPart(productId, productPart) {
    return this.http.post('/api/products/' + productId + '/parts', productPart, this.generateHeaders());
  }

  getProductPartDetails(productId:string, productPartId: string) {
    return this.http.get('/api/products/' + productId + '/parts/' + productPartId);
  }

  getProductPartTickets(productId: string, productPartId: string) {
    return this.http.get('/api/products/' + productId + '/parts/' + productPartId + '/tickets');
  }

  getTasks(ticketId: string) {
    return this.http.get('/api/tickets/' + ticketId + '/tasks');
  }
}
          