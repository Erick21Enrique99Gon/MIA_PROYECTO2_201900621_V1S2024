import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
export const routes: Routes = [
    {
        path: 'Registro',
        component: RegistroComponent
    },
    {
        path: 'login',
        component: RegistroComponent
    }
];
