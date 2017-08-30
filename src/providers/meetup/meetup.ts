import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

/*
  Generated class for the MeetupProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MeetupProvider {
  private config = {
    apiKey: "",
    eventId: ""
  };

  constructor(public http: Http) {
  }

  public updateConfig(newConfig) {
    this.config = newConfig;
    return this.fetchMeetupMembers();
  }

  private fetchMeetupMembers() {
    const apiUrl = `api/rsvps?event_id=${this.config.eventId}&key=${this.config.apiKey}&rsvp=yes&sign=true`;

    this.http.get(apiUrl)
        .subscribe(console.log);
  }
}
