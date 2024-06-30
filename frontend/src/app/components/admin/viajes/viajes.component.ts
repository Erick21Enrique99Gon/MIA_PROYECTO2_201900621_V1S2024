import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})
export class ViajesComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  navigateToRegistro(){
    this.router.navigate(['/Registro']);
  }
  navigateToRegistroRecepcionista(){
    this.router.navigate(['/RegistroRecepcionista']);
  }
  navigateToRegistroViaje(){
    this.router.navigate(['/RegistroViaje']);
  }
  navigateToRegistroAuto(){
    this.router.navigate(['/RegistroAuto']);
  }
  navigateToLogin(){
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

  form_registro = new FormGroup({
    nombre_agencia: new FormControl('', Validators.required),
    ciudad_origen: new FormControl('', Validators.required),
    ciudad_destino: new FormControl('', Validators.required),  
    dias_vuelo: new FormControl('', Validators.required),
    precio_vuelo: new FormControl('', Validators.required)
  });

  registro(){
    if(this.form_registro.valid){
      const data = this.form_registro.value;
      console.log(data);
      this.usuarioService.consult_post('/admin/registroViajes', data).subscribe({
        next: (data: any) => {
          console.log(data.msg);
          if(data.status === true){
            Swal.fire({
              title: 'Registro exitoso',
              text: data.msg || '',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            // this.router.navigate(['/login']);
          } else {
            Swal.fire({
              title: 'Error al registrar viaje',
              text: data.msg || '',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error: (error: any) => {
          Swal.fire({
            title: 'Error al registrar viaje',
            text: 'Error en el servidor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error al registrar viaje',
        text: 'Campos vacios o incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
