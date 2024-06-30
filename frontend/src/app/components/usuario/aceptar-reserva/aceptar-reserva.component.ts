import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-aceptar-reserva',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './aceptar-reserva.component.html',
  styleUrl: './aceptar-reserva.component.css'
})
export class AceptarReservaComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  tipoAutos:string = "Autos";
  tipoViajes:string = "Viajes";
  reservas: any = [];

  navigateToLogin() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('tipo');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.usuarioService.consult_get("/recepcion/reservas").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.reservas = data.data;
        } else {
          Swal.fire({
            title: 'Error al cargar reservas',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (error: any) => {
        console.log(error.error.msg);
        Swal.fire({
          title: 'Error al cargar reservas',
          text: 'Error en el servidor: '+ error.error.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    );
  }

  aceptarReserva(usuario: string, aceptando: any,tipo: string) {
    this.usuarioService.consult_post('/recepcion/aceptar', { usuario,aceptando,tipo }).subscribe({
      next: (data: any) => {
        if (data.status === true) {
          Swal.fire({
            title: 'Reserva aceptada',
            text: data.msg,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.cargar();
        } else {
          Swal.fire({
            title: 'Error al aceptar reserva',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (error: any) => {
        console.log(error.error.msg);
        Swal.fire({
          title: 'Error al aceptar reserva',
          text: 'Error en el servidor: ' + error.error.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  rechazarReserva(usuario: string, aceptando: any,tipo: string) {
    this.usuarioService.consult_post('/recepcion/rechazar', { usuario,aceptando,tipo}).subscribe({
      next: (data: any) => {
        if (data.status === true) {
          Swal.fire({
            title: 'Reserva rechazada',
            text: data.msg,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.cargar();
        } else {
          Swal.fire({
            title: 'Error al rechazar reserva',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (error: any) => {
        console.log(error.error.msg);
        Swal.fire({
          title: 'Error al rechazar reserva',
          text: 'Error en el servidor: ' + error.error.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

}
