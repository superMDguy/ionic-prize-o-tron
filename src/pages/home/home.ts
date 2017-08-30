import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { MeetupProvider, MeetupRSVP } from "../../providers/meetup/meetup";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  public meetupRsvps$: BehaviorSubject<MeetupRSVP[]>;

  constructor(public navCtrl: NavController,
              private meetupProvider: MeetupProvider) {
  }

  ngOnInit() {
    this.meetupRsvps$ = this.meetupProvider.meetupRsvps$;
  }

}
