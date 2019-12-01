import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TouchSequence } from 'selenium-webdriver';
import { Globals } from './globals';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private server: string = "https://localhost:443/";

  constructor(private http: HttpClient, private globals: Globals) { }

  createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*', 'Authorization': 'bearer ' + this.globals.loggedUser.token})
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

  createTicket(ticket) {
    return this.http.post('api/tickets', ticket, this.generateHeaders());
  }

  deleteTicket(tickedId: string) {
    return this.http.delete('api/tickets/' + tickedId);
  }

  updateTicket(ticketId: string, ticket) {
    return this.http.patch('/api/tickets/' + ticketId, ticket, this.generateHeaders());
  }

  registerProduct(product) {
    return this.http.post('api/products', product, this.generateHeaders());
  }

  deleteProduct(productId: string) {
    return this.http.delete('/api/products/' + productId);
  }

  updateProduct(productId: string, product) {
    return this.http.patch('/api/products/' + productId, product, this.generateHeaders())
  }

  createProductPart(productId: string, productPart) {
    return this.http.post('/api/products/' + productId + '/parts', productPart, this.generateHeaders());
  }

  deleteProductPart(productId: string, productPartId: string) {
    return this.http.delete('/api/products/' + productId + '/parts/' + productPartId);
  }

  updateProductPart(productId: string, productPartId: string, productPart) {
    return this.http.patch('/api/products/' + productId + '/parts/' + productPartId, productPart, this.generateHeaders());
  }

  getProductPartDetails(productId:string, productPartId: string) {
    return this.http.get('/api/products/' + productId + '/parts/' + productPartId);
  }

  getProductPartTickets(productId: string, productPartId: string) {
    return this.http.get('/api/products/' + productId + '/parts/' + productPartId + '/tickets');
  }

  createTask(ticketId: string, task) {
    return this.http.post('api/tickets/' + ticketId + '/tasks', task, this.generateHeaders());
  }

  getTasks(ticketId: string) {
    return this.http.get('/api/tickets/' + ticketId + '/tasks');
  }

  getTaskDetails(ticketId: string, taskId: string) {
    return this.http.get('/api/tickets/' + ticketId + '/tasks/' + taskId);
  }

  deleteTask(ticketId: string, taskId: string) {
    return this.http.delete('api/tickets/' + ticketId + '/tasks/' + taskId);
  }

  updateTask(ticketId: string, taskId: string, task) {
    return this.http.patch('api/tickets/' + ticketId + '/tasks/' + taskId, task, this.generateHeaders());
  }

  getTicketComments(ticketId: string) {
    return this.http.get('/api/tickets/' + ticketId + '/comments');
  }

  createTicketComment(ticketId: string, comment) {
    return this.http.post('/api/tickets/' + ticketId + '/comments', comment, this.generateHeaders());
  }

  logIn(user) {
    return this.http.post('/api/login', user, {observe: 'response'});
  }
}
          