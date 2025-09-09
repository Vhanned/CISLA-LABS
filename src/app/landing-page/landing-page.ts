import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage implements OnInit {

  @ViewChild('contactModal') modal!: ElementRef<HTMLDivElement>;
  @ViewChild('modalForm') modalForm!: ElementRef<HTMLFormElement>;

  heroIndex = 0;
  heroSlides!: NodeListOf<Element>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startCarousel();
  }

  ngAfterViewInit(): void {
    this.heroSlides = document.querySelectorAll(".hero-slide");
  }

  startCarousel() {
    setInterval(() => {
      if (this.heroSlides && this.heroSlides.length > 0) {
        this.heroSlides[this.heroIndex].classList.remove("active");
        this.heroIndex = (this.heroIndex + 1) % this.heroSlides.length;
        this.heroSlides[this.heroIndex].classList.add("active");
      }
    }, 4000);
  }

  toggleMenu() {
    const navMenu = document.getElementById("nav-menu");
    navMenu?.classList.toggle("show");
  }

  irAvisoPrivacidad() {
    this.router.navigate(['avisoPrivacidad']);
  }

  openModal() {
    this.modal.nativeElement.style.display = "block";
  }

  closeModal() {
    this.modal.nativeElement.style.display = "none";
  }

  submitModalForm(event: Event) {
    event.preventDefault();
    alert("✅ Gracias por tu mensaje. ¡Nos pondremos en contacto pronto!");
    this.closeModal();
  }
}
