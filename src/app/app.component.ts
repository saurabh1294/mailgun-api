import { Component, OnInit } from '@angular/core';
import { MailgunAPIService } from './shared/services/mailgun-api.service';

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'app-root app-mailgun-api-demo',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class MailgunAPIComponent implements OnInit {
  model: any = {};

  constructor(private mailgunAPIService: MailgunAPIService) {}

  ngOnInit() {
    // TODO any initialization goes here
  }

  submit() {
    this.mailgunAPIService.sendMails(this.model.emailIDsInput, this.model).subscribe(response => {
      console.log(response, 'this is the response');
      this.model.emailIDsOutput = JSON.stringify(response);
    });
  }
}
