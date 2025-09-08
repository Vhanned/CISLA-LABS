import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

  constructor() {
  }

  Carusel() {
    // Hero carrusel
    const heroSlides = document.querySelectorAll(".hero-slide");
    let heroIndex = 0;
    setInterval(() => {
      heroSlides[heroIndex].classList.remove("active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("active");
    }, 4000);
  }

}
