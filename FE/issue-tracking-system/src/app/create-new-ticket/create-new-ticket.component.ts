import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss']
})
export class CreateNewTicketComponent implements OnInit {

  createTicketForm;

  constructor(private formBuilder: FormBuilder) { 
    this.createTicketForm = this.formBuilder.group({
      name: '',
      description: '',
      product: ''
    })
   }

  
  onSubmit(data) {
    console.log(data);
    this.createTicketForm.reset();
  }

  ngOnInit() {
  }

}
