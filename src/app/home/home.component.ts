import { Component } from '@angular/core';
import { Announcement } from '../announcement';
import { Category } from '../category';
import { AnnouncementService } from '../services/announcement.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor( private announcementService: AnnouncementService, private notificationService: NotificationService){}

  title = 'notifications-app';

  notificationMessage : string

  ngOnInit() {
    this.notificationService.initWebSocket();
    this.notificationService.notificationSubject.subscribe(hasNotifications => this.notificationMessage = hasNotifications ? "New notifications, please refresh the page" : "");
    this.announcementService.getAnnouncements().subscribe(announcements => {
      this.announcements = announcements;
    });
    this.filteredAnnouncements = this.announcements;
    this.announcementService.serviceCall();
  }

  filteredAnnouncements : Announcement[];
  announcements: Announcement[]

    onCategorySelected(id: string) {
      this.filteredAnnouncements = this.announcements.filter(a => a.categoryId === id);
    }
    onResetFilters(){
      this.filteredAnnouncements = this.announcements;
    }
    
}
