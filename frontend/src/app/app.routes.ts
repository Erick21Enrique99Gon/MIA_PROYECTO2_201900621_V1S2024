import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrarRecepcionistaComponent } from './components/auth/registrar-recepcionista/registrar-recepcionista.component';
import { ViajesComponent } from './components/admin/viajes/viajes.component';
import { AutosComponent } from './components/admin/autos/autos.component';
export const routes: Routes = [
    {
        path: 'Registro',
        component: RegistroComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'RegistroRecepcionista',
        component: RegistrarRecepcionistaComponent
    },
    {
        path: 'RegistroViaje',
        component: ViajesComponent
    },
    {
        path: 'RegistroAuto',
        component: AutosComponent
    }
];
