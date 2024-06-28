import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  form_registro = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),  
    correo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });
  // [
  //   Validators.minLength(8),
  //   Validators.required,
  //   Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])')
  // ]

  registro(){
    if(this.form_registro.valid){
      if(this.form_registro.value.password != this.form_registro.value.confirm_password){
        alert('Las contraseñas no coinciden');
      } else
      {const data = this.form_registro.value;
        Object.assign(data, {tipo: 'usuario'}); // Object.assign(data, {tipo: 'usuario'}
        console.log(data);
        this.usuarioService.consult_post('/admin/registro', data).subscribe({
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
                title: 'Error registrar usuario',
                text: data.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error registrar usuario',
              text: 'Error en el servidor',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }}
        );
      }
    } else {
      Swal.fire({
        title: 'Error registrar usuario',
        text: 'Campos vacios o incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
