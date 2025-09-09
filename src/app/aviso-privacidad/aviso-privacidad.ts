import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-aviso-privacidad',
  imports: [],
  templateUrl: './aviso-privacidad.html',
  styleUrl: './aviso-privacidad.css'
})
export class AvisoPrivacidad {

  constructor(private router: Router) {
  }

    irInicio() {
    this.router.navigate(['Inicio']);
  }
}
