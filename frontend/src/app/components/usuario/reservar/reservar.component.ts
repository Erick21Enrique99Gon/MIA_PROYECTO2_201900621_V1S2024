import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.css'
})
export class ReservarComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  carros: any = [];
  viajes: any = [];

  ngOnInit(): void {
    console.log("Cargando autos");
    this.cargarAutos();
    this.cargarViajes();
  }

  cargarAutos() {
    console.log("Cargando autos");
    this.usuarioService.consult_get("/admin/autos").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.carros = data.data;
        } else {
          Swal.fire({
            title: 'Error al cargar autos',
            text: data.data.msg,
            icon: 'error'
          });
        }
      },
      error: (error: any) => {
        Swal.fire({
          title: 'Error al cargar autos',
          text: 'Error al cargar autos',
          icon: 'error'
        });
      }
    });
  }

  reservarAuto(reservandoAuto: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas reservarAuto este auto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, reservarAuto',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(reservandoAuto);
        Object.assign(reservandoAuto, {usuario: localStorage.getItem('usuario')});
        console.log(reservandoAuto);
        this.usuarioService.consult_post('/usuario/registroAutos', reservandoAuto).subscribe({
          next: (data: any) => {
            if(data.status === true){
              Swal.fire({
                title: 'Auto reservado',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              console.log(data.msg);
              this.cargarAutos();
            } else {
              Swal.fire({
                title: 'Error al reservarAuto auto',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error al reservarAuto auto',
              text: 'Error en el servidor',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
        // Swal.fire('auto eliminado', 'auto eliminado correctamente', 'success');
      }
    });
  }

  cargarViajes() {
    this.usuarioService.consult_get("/admin/viajes").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.viajes = data.data;
        } else {
          Swal.fire({
            title: 'Error al cargar viajes',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (error: any) => {
        console.log(error.error.msg);
        Swal.fire({
          title: 'Error al cargar viajes',
          text: 'Error en el servidor: '+ error.error.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    );
  }

  reservarViaje(reservandoViaje: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas reservar este viaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, reservar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(reservandoViaje);
        Object.assign(reservandoViaje, {usuario: localStorage.getItem('usuario')});
        console.log(reservandoViaje);
        this.usuarioService.consult_post('/usuario/registroViajes', reservandoViaje).subscribe({
          next: (data: any) => {
            if(data.status === true){
              Swal.fire({
                title: 'Viaje reservado',
                text: data.msg,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              console.log(data.msg);
              this.cargarViajes();
            } else {
              Swal.fire({
                title: 'Error al reservar viaje',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error al reservar viaje',
              text: 'Error en el servidor',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
        // Swal.fire('auto eliminado', 'auto eliminado correctamente', 'success');
      }
    });
  }
}
