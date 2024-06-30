import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ver-historial',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './ver-historial.component.html',
  styleUrl: './ver-historial.component.css'
})
export class VerHistorialComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  historial: any = [];
  
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
    this.usuarioService.consult_get("/admin/historial").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.historial = data.data;
        } else {
          Swal.fire({
            title: 'Error al cargar historial',
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (error: any) => {
        console.log(error.error.msg);
        Swal.fire({
          title: 'Error al cargar historial',
          text: 'Error en el servidor: '+ error.error.msg,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    );
  }
}
