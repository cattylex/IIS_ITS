import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Comment } from 'src/app/ticket-details/comments/comments.component';
import { ActivatedRoute } from '@angular/router';

export interface NewComment {
  text: string;
}

@Component({
  selector: 'app-create-comment-dialog',
  templateUrl: './create-comment-dialog.component.html',
  styleUrls: ['./create-comment-dialog.component.scss']
})
export class CreateCommentDialogComponent implements OnInit {

  public createCommentForm: FormGroup;

  constructor(private _http: HttpService, public dialogRef: MatDialogRef<CreateCommentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute) { }

  ngOnInit() {
    this.createCommentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    })
  }

  public hasError(controlName: string, errorName: string) {
    return this.createCommentForm.controls[controlName].hasError(errorName);
  }

  public createComment(createCommentFormValue) {
    if (this.createCommentForm.valid) {
      let comment: NewComment = {
        text: createCommentFormValue.comment,
      }

      this._http.createTicketComment(this.data.id, comment).subscribe(res => {

      }, error => {
        let errorMessage = JSON.parse(JSON.stringify(error.error));
        alert(errorMessage.error); //TODO
      });

      this.dialogRef.close();
      
    }

  }


}
