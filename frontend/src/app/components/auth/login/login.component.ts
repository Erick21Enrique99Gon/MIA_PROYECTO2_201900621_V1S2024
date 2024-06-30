import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  form_login = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login(){
    if(this.form_login.valid){
      const data = this.form_login.value;
      console.log(this.form_login.value.usuario);
      this.usuarioService.consult_post('/login', data).subscribe({
        next: (data: any) => {
          console.log(data.msg);
          if(data.status === true){
            Swal.fire({
              title: 'Bienvenido',
              text: this.form_login.value.usuario || '',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            console.log(data.data);
            console.log(data.data[0]);
            if(data.data.tipo === 'admin'){
              this.router.navigate(['/Registro']);
            }else if(data.data[0].tipo === 'usuario'){
              localStorage.setItem('nombre', data.data[0].nombre);
              localStorage.setItem('apellido', data.data[0].apellido);
              localStorage.setItem('usuario', data.data[0].usuario);
              localStorage.setItem('correo', data.data[0].correo);
              localStorage.setItem('tipo', data.data[0].tipo);
              this.router.navigate(['/Reservar']);
            }else if(data.data[0].tipo === 'recepcionista'){
              localStorage.setItem('nombre', data.data[0].nombre);
              localStorage.setItem('apellido', data.data[0].apellido);
              localStorage.setItem('usuario', data.data[0].usuario);
              localStorage.setItem('correo', data.data[0].correo);
              localStorage.setItem('tipo', data.data[0].tipo);
              this.router.navigate(['/AceptarReserva']);
            }
            // this.router.navigate(['/login']);
          } else {
            Swal.fire({
              title: 'Error al iniciar sesion',
              text: data.msg,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error: (error: any) => {
          console.log(error);
          Swal.fire({
            title: 'Error al iniciar sesion',
            text: 'Problemas con el servidor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error al iniciar sesion',
        text: 'Datos incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
