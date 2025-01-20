import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  isExpanded: boolean = false;

  // Method to toggle the state
  readMorePara() {
    this.isExpanded = !this.isExpanded; // Toggle the boolean value
  }

  // Method to get button text based on the state
  getButtonText(): string {
    return this.isExpanded ? 'See less' : 'Read more ...';
  }
}
