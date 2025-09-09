import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.carusel();
  }

  carusel() {
    const heroSlides = document.querySelectorAll(".hero-slide");
    let heroIndex = 0;
    setInterval(() => {
      heroSlides[heroIndex].classList.remove("active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("active");
    }, 4000);
  }

  menuHamburguesa() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger) {
      hamburger.addEventListener("click", () => {
        if (navMenu) {
          navMenu.classList.toggle("show");
        }
      });
    }
  }

  irAvisoPrivacidad() {
    this.router.navigate(['avisoPrivacidad']);
  }

}
