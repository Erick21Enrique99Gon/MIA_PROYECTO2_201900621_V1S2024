import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editar-viajes',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './editar-viajes.component.html',
  styleUrl: './editar-viajes.component.css'
})
export class EditarViajesComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  viajes: any = [];

  navigateToRegistro() {
    this.router.navigate(['/Registro']);
  }
  navigateToRegistroRecepcionista() {
    this.router.navigate(['/RegistroRecepcionista']);
  }
  navigateToRegistroViaje() {
    this.router.navigate(['/RegistroViaje']);
  }
  navigateToRegistroAuto() {
    this.router.navigate(['/RegistroAuto']);
  }
  navigateToLogin() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('usuario');
    localStorage.removeItem('correo');
    localStorage.removeItem('tipo');
    this.router.navigate(['/login']);
  }

  navigateToEditarViajes(){
    this.router.navigate(['/EditarViajes']);
  }

  navigateToEditarAutos(){
    this.router.navigate(['/EditarAutos']);
  }

  navigateToEditarUsuarios(){
    this.router.navigate(['/EditarUsuarios']);
  }

  navigateToEditarRecepcionistas(){
    this.router.navigate(['/EditarRecepcionistas']);
  }

  ngOnInit(): void {
    this.cargarViajes();
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

  eliminar(viajeEliminando: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este viaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(viajeEliminando);
        this.usuarioService.consult_post('/admin/viajesEliminar', viajeEliminando).subscribe({
          next: (data: any) => {
            if(data.status === true){
              console.log(data.msg);
              this.cargarViajes();
            } else {
              Swal.fire({
                title: 'Error al eliminar viaje',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error al eliminar viaje',
              text: 'Error en el servidor',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
        // Swal.fire('viaje eliminado', 'viaje eliminado correctamente', 'success');
      }
    });
  }
}
