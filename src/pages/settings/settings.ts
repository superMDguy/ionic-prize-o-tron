import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  public model = {eventId: "", apiKey: ""};

  constructor(public navCtrl: NavController) {

  }

  saveSettings() {
    console.log("Settings saved", this.model);
  }

}
