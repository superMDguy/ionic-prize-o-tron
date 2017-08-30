import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { MeetupProvider, MeetupRSVP } from "../../providers/meetup/meetup";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  public meetupRsvps: MeetupRSVP[];

  constructor(public navCtrl: NavController,
              private meetupProvider: MeetupProvider) {
  }

  ngOnInit() {
    this.meetupProvider.meetupRsvps$.subscribe((newRsvps: MeetupRSVP[]) => this.meetupRsvps = newRsvps);
  }

  ngOnDestroy() {
    this.meetupProvider.meetupRsvps$.unsubscribe();
  }

}
