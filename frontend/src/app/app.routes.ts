import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PlacesComponent } from './components/places/places';
import { PreferencesComponent } from './components/preferences/preferences'; // Осыны қостық

export const routes: Routes = [
  { path: '', redirectTo: '/places', pathMatch: 'full' }, // Басты бет автоматты түрде орындарды ашады
  { path: 'login', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'preferences', component: PreferencesComponent }
];