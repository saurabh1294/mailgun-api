import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MailgunAPIComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MailgunAPIService } from './shared/services/mailgun-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MailgunAPIComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [{ provide: MailgunAPIService, useClass: MailgunAPIService }],
  bootstrap: [MailgunAPIComponent]
})
export class AppModule {}
