import { Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { AvisoPrivacidad } from './aviso-privacidad/aviso-privacidad';

export const routes: Routes = [
    {path:'Inicio',component:LandingPage},
    {path:'avisoPrivacidad',component:AvisoPrivacidad},
];
