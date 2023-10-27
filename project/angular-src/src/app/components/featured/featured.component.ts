import { Component, OnInit } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: "app-featured",
  templateUrl: "./featured.component.html",
  styleUrls: ["./featured.component.css"],
})
export class FeaturedComponent implements OnInit {
  quotes: Object[];

  constructor(private http: Http, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getFeaturedQuotes().subscribe(
      (data) => {
        this.quotes = data.featuredQuotes;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
