import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the MeetupProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MeetupProvider {
  public meetupRsvps$: BehaviorSubject<MeetupRSVP[]> = new BehaviorSubject(null);
  private config = {
    apiKey: "",
    eventId: ""
  };

  constructor(public http: Http) {
  }

  public getConfig() {
    return this.config;
  }

  public updateConfig(newConfig): Observable<MeetupRSVP[]> {
    this.config = newConfig;
    return this.fetchMeetupMembers();
  }

  private fetchMeetupMembers(): Observable<MeetupRSVP[]> {
    const apiUrl = `api/rsvps?event_id=${this.config.eventId}&key=${this.config.apiKey}&rsvp=yes&sign=true`;
    const alternateAvatarUrl = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

    return this.http.get(apiUrl)
               .map(res => res.json()
                              .results
                              .map(result => (
                                  {
                                    id: result.member.member_id,
                                    name: result.member.name,
                                    included: true,
                                    photoUrl: result.member_photo ? result.member_photo.photo_link : alternateAvatarUrl
                                  } as MeetupRSVP
                                )
                              )
               )
               .do((rsvps: MeetupRSVP[]) => this.meetupRsvps$.next(rsvps));
  }
}

export interface MeetupRSVP {
  id: number;
  name: string;
  included: boolean;
  photoUrl: string;
}
