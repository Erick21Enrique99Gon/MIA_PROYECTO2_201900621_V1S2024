import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-recepcionistas',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './editar-recepcionistas.component.html',
  styleUrl: './editar-recepcionistas.component.css'
})
export class EditarRecepcionistasComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  recepcionistas: any = [];

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

  navigateToHistorial(){
    this.router.navigate(['/Historial']);
  }

  ngOnInit(): void {
    this.cargar();
  }
  cargar() {
    this.usuarioService.consult_get("/admin/recepcionistas").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.recepcionistas = data.data;
        } else {
          this.recepcionistas = [];
          Swal.fire({
            title: 'Error al cargar recepcionistas',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      },
      error: (error: any) => {
        this.recepcionistas = [];
        Swal.fire({
          title: 'Error al cargar recepcionistas',
          text: error.error.msg,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
  eliminar(Eliminando:any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este recepcionista?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        console.log(Eliminando);
        this.usuarioService.consult_post('/admin/recepcionistasEliminar', Eliminando).subscribe({
          next: (data: any) => {
            if(data.status === true){
              console.log(data.msg);
              this.cargar();
            } else {
              Swal.fire({
                title: 'Error al eliminar recepcionista',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error,"aaaaa");
            Swal.fire({
              title: 'Error al eliminar recepcionista',
              text: 'Error en el servidor'+error.msg,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
        // Swal.fire('recepcionista eliminado', 'recepcionista eliminado correctamente', 'success');
      }
    });
  }
}
