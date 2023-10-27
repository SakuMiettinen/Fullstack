import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { QuoteCardComponent } from "../quote-card/quote-card.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user: Object;
  quotes: Object[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.user = profile.user;
        this.authService
          .getUserQuotes(this.user["username"])
          .subscribe((data) => {
            this.quotes = JSON.parse(data["_body"]).quotes;
          });
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
