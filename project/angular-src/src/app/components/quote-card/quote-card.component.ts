import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-quote-card",
  templateUrl: "./quote-card.component.html",
  styleUrls: ["./quote-card.component.css"],
})
export class QuoteCardComponent implements OnInit {
  @Input() creator: String;
  @Input() date: String;
  @Input() quote: String;

  constructor() {}

  ngOnInit() {}
}
