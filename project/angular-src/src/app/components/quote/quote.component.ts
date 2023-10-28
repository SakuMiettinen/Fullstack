import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-quote",
  templateUrl: "./quote.component.html",
  styleUrls: ["./quote.component.css"],
})
export class QuoteComponent implements OnInit {
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}

  clearQuote() {
    const quoteInput = <HTMLInputElement>document.getElementById("quoteInput");
    quoteInput.value = " ";
  }

  saveQuote() {
    const quoteInput = <HTMLInputElement>document.getElementById("quoteInput");
    this.authService.getProfile().subscribe(
      (profile) => {
        const date = new Date();
        const dateString =
          date.getDate() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes();
        const quote = quoteInput.value;
        const newQuote = {
          quote: quote,
          username: profile.user.username,
          date: dateString,
        };

        this.authService.saveQuote(newQuote).subscribe((data) => {
          if (data.success) {
            this.flashMessage.show("Your quote has been saved", {
              cssClass: "alert-success",
              timeout: 3000,
            });
          } else {
            this.flashMessage.show(
              "Something went wrong. Quote has not been saved",
              {
                cssClass: "alert-danger",
                timeout: 3000,
              }
            );
          }
        });
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
