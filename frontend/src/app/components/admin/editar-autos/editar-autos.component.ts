import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-autos',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './editar-autos.component.html',
  styleUrl: './editar-autos.component.css'
})
export class EditarAutosComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  carros: any = [];

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
    this.cargar();
  }
  cargar() {
    this.usuarioService.consult_get("/admin/autos").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.carros = data.data;
        } else {
          Swal.fire({
            title: 'Error al cargar autos',
            text: data.msg,
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
  eliminar(Eliminando: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este auto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(Eliminando);
        this.usuarioService.consult_post('/admin/autosEliminar', Eliminando).subscribe({
          next: (data: any) => {
            if(data.status === true){
              console.log(data.msg);
              this.cargar();
            } else {
              Swal.fire({
                title: 'Error al eliminar auto',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error al eliminar auto',
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
