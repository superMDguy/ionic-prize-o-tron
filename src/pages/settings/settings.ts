import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { MeetupProvider } from "../../providers/meetup/meetup";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  public model = {eventId: "", apiKey: ""};

  constructor(public navCtrl: NavController,
              private meetupProvider: MeetupProvider) {
  }

  saveSettings() {
    this.meetupProvider.updateConfig(this.model);
  }

}
