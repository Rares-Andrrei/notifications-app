import { Component } from '@angular/core';
import { Category } from '../category';
import { NgForm } from '@angular/forms';
import { Announcement } from '../announcement';
import { AnnouncementComponent } from '../announcement/announcement.component';
import { AnnouncementService } from '../services/announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-announcement-form',
  templateUrl: './add-announcement-form.component.html',
  styleUrls: ['./add-announcement-form.component.scss']
})
export class AddAnnouncementFormComponent {

  constructor(private announcementService: AnnouncementService, private route: ActivatedRoute, private categoryService: CategoryService,
    private notificationService : NotificationService, private router: Router) { 
      
    }
  

  title : string;
  author : string;
  imageUrl : string;
  textField : string;
  selectedCategoryId : string;
  categories : Category[];
  id: string;
  

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories});
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== "new") {
      this.announcementService.getAnnouncementById(this.id).subscribe(data=> {this.title = data.title;
        this.author = data.author;
        this.imageUrl = data.imageUrl;
        this.selectedCategoryId = data.categoryId;
        this.textField = data.message;});
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    let announcement: Announcement = {
      title: this.title,
      message: this.textField,
      author: this.author,
      categoryId: this.selectedCategoryId,
      imageUrl: this.imageUrl,
      id: this.id
    }
    if(this.id === "new"){
      this.announcementService.addAnnouncement(announcement).subscribe(r => {
        this.notificationService.sendMessage("BroadcastMessage", [r])
        this.router.navigateByUrl("");
      }
        );
    }
    else{
      this.announcementService.editAnnouncement(announcement).subscribe(r => {
        this.notificationService.sendMessage("BroadcastMessage", [r])
        this.router.navigateByUrl("");
      }
        );
    }
  }
}
