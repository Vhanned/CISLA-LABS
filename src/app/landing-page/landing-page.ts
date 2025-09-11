import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage {

  //Seccion de declaraciones

  //Seccion de declaraciones

  constructor(private router: Router) { }



  irAvisoPrivacidad() {
    this.router.navigate(['avisoPrivacidad']);
  }
}
