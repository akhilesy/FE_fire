import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

@Component({
  selector: 'app-home-corosoul',
  templateUrl: './home-corosoul.component.html',
  styleUrls: ['./home-corosoul.component.scss']
})
export class HomeCorosoulComponent {

constructor(private router:Router,private spiner: NgxSpinnerService){}

  getRegister():void{
    this.spiner.show();
    setTimeout(()=>{
      this.router.navigateByUrl("/register");
      this.spiner.hide();
    },300)
  }
}
