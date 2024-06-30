import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.css'
})
export class EditarUsuariosComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  usuarios: any = [];

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
  ngOnInit(): void {
    this.cargar();
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

  navigateToHistorial(){
    this.router.navigate(['/Historial']);
  }

  cargar() {
    this.usuarioService.consult_get("/admin/usuarios").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.usuarios = data.data;
        } else {
          Swal.fire({
            title: 'Error al cargar usuarios',
            text: data.msg,
            icon: 'error'
          });
        }
      },
      error: (error) => {
        this.usuarios = [];
        Swal.fire({
          title: 'Error al cargar usuarios',
          text: error.error.msg,
          icon: 'error'
        });
      }
    });
  }

  eliminar(Eliminando:any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(Eliminando);
        this.usuarioService.consult_post('/admin/usuariosEliminar', Eliminando).subscribe({
          next: (data: any) => {
            if(data.status === true){
              console.log(data.msg);
              this.cargar();
            } else {
              Swal.fire({
                title: 'Error al eliminar usuario',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error,"aaaaa");
            Swal.fire({
              title: 'Error al eliminar usuario',
              text: 'Error en el servidor'+error.msg,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
        // Swal.fire('usuario eliminado', 'usuario eliminado correctamente', 'success');
      }
    });
  }
}
