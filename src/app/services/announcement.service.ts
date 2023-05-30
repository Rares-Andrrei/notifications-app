import { Injectable } from '@angular/core';
import { Announcement } from '../announcement';
import { Category } from '../category';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { animation } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  baseURL: string = "https://localhost:7037"
  serviceCall() {
    console.log("Service was called");
   }
  constructor(private http: HttpClient) { }

  announcements: Announcement[] = [];

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.baseURL + "/Announcement");
  }

  addAnnouncement(announcement: Announcement): Observable<Announcement> {   
    return this.http.post<Announcement>(this.baseURL + "/Announcement", announcement); 
  }
  editAnnouncement(announcement: Announcement): Observable<Announcement> {   
    return this.http.put<Announcement>(this.baseURL + "/Announcement/" + announcement.id, announcement); 
  }
  deleteAnnouncement(announcement :Announcement) : Observable<Announcement> {
    return this.http.delete<Announcement>(this.baseURL + "/Announcement/" + announcement.id)
  }
  getAnnouncementById(id: string) : Observable<Announcement>{
    return this.http.get<Announcement>(this.baseURL + "/Announcement/" + id)
  }
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };


}
