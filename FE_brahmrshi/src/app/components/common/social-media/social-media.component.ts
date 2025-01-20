import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent {

  socialMedia!:any;

  constructor(private commonService:CommonService){}

  ngOnInit(): void {
  this.getAllSocialMedia();
    
  }

  getAllSocialMedia():void{
    this.commonService.getAllSocialMedia().subscribe({
      next: (data) => {
        this.socialMedia = data.data;
        console.log(this.socialMedia);
      },
      error: (err) => {
        console.error('Error fetching states:', err);
      }
    });
  }

}
