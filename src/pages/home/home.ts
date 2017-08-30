import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { MeetupProvider, MeetupRSVP } from "../../providers/meetup/meetup";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit, OnDestroy {
  public meetupRsvps: MeetupRSVP[];
  public potentialWinners: MeetupRSVP[];
  public winners: MeetupRSVP[] = [];

  constructor(public navCtrl: NavController,
              private meetupProvider: MeetupProvider) {
  }

  public ngOnInit() {
    this.meetupProvider.meetupRsvps$.subscribe((newRsvps: MeetupRSVP[]) => {
      this.meetupRsvps = newRsvps;
      this.winners = [];
      this.potentialWinners = newRsvps;
    });
  }

  public updatePotentialWinners() {
    if (!this.potentialWinners) return;

    this.potentialWinners = this.meetupRsvps.filter(potentialWinner => potentialWinner.included);
  }

  public selectWinner() {
    if (this.potentialWinners && this.potentialWinners.length) {
      const randomIndex = Math.floor(Math.random() * this.potentialWinners.length);
      this.winners.push(this.potentialWinners[randomIndex]);
      this.potentialWinners.splice(randomIndex, 1);
    }
  }

  public ngOnDestroy() {
    this.meetupProvider.meetupRsvps$.unsubscribe();
  }

}
