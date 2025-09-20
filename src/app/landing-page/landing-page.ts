import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage {

  //Seccion de declaraciones

  //Seccion de declaraciones

  constructor(private router: Router) { }

  abrirModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModal(){
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }

  irAvisoPrivacidad() {
    this.router.navigate(['avisoPrivacidad']).then(()=>{
      window.scrollTo(0,0);
    })
  }
}
