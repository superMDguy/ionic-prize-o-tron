import { Component, OnInit } from "@angular/core";
import { LoadingController, NavController } from "ionic-angular";
import { MeetupProvider } from "../../providers/meetup/meetup";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage implements OnInit {
  public model = {eventId: "", apiKey: ""};

  constructor(public navCtrl: NavController,
              private meetupProvider: MeetupProvider,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.model = this.meetupProvider.getConfig();
  }

  saveSettings() {
    const loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.meetupProvider.updateConfig(this.model)
        .subscribe(() => loader.dismiss());
  }
}
