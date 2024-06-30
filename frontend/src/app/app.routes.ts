import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrarRecepcionistaComponent } from './components/auth/registrar-recepcionista/registrar-recepcionista.component';
import { ViajesComponent } from './components/admin/viajes/viajes.component';
import { AutosComponent } from './components/admin/autos/autos.component';
import { EditarViajesComponent } from './components/admin/editar-viajes/editar-viajes.component';
import { EditarAutosComponent } from './components/admin/editar-autos/editar-autos.component';
import { EditarUsuariosComponent } from './components/admin/editar-usuarios/editar-usuarios.component';
import { EditarRecepcionistasComponent } from './components/admin/editar-recepcionistas/editar-recepcionistas.component';
import { ReservarComponent } from './components/usuario/reservar/reservar.component';
import { VerHistorialComponent } from './components/admin/ver-historial/ver-historial.component';
import { AceptarReservaComponent } from './components/usuario/aceptar-reserva/aceptar-reserva.component';
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
    },
    {
        path: 'EditarViajes',
        component: EditarViajesComponent
    },
    {
        path: 'EditarAutos',
        component: EditarAutosComponent
    },
    {
        path: 'EditarUsuarios',
        component: EditarUsuariosComponent
    },
    {
        path: 'EditarRecepcionistas',
        component: EditarRecepcionistasComponent
    },
    {
        path: 'Reservar',
        component: ReservarComponent
    },
    {
        path: 'Historial',
        component: VerHistorialComponent
    },
    {
        path: 'AceptarReserva',
        component: AceptarReservaComponent
    }
];
