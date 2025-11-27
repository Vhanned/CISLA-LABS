import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage implements OnInit {

  //Seccion de declaraciones
  contactForm: FormGroup;
  enviando = false;
  mensajeExito = '';
  mensajeError = '';
  //Seccion de declaraciones

  constructor(private router: Router, private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      asunto: ['', [Validators.required, Validators.minLength(3)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    if (this.firebaseService.verificarConexion()) {
      console.log('✅ Conexión con Firebase verificada');
    } else {
      console.error('❌ Error: Firebase no está conectado');
    }
  }

  abrirModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none';
    }
  }

  irAvisoPrivacidad() {
    this.router.navigate(['avisoPrivacidad']).then(() => {
      window.scrollTo(0, 0);
    })
  }

  async onSubmit() {
    // Marca todos los campos como tocados para mostrar errores
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      this.mensajeError = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    this.enviando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    try {
      const resultado = await this.firebaseService.guardarContacto(this.contactForm.value);

      console.log('✅ Respuesta de Firebase:', resultado);
      this.mensajeExito = '¡Mensaje enviado correctamente! Te contactaremos pronto.';
      this.contactForm.reset();

      // Limpia el mensaje después de 5 segundos
      setTimeout(() => {
        this.mensajeExito = '';
      }, 5000);

    } catch (error: any) {
      console.error('❌ Error completo:', error);
      this.mensajeError = 'Error al enviar el mensaje. Por favor, intenta de nuevo.';

      // Muestra detalles del error en consola para debugging
      if (error.message) {
        console.error('Detalles:', error.message);
      }
    } finally {
      this.enviando = false;
    }
  }


  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);

    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('pattern')) {
      return 'Ingresa un teléfono válido (10 dígitos)';
    }

    return '';
  }
}
