import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-recepcionista',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registrar-recepcionista.component.html',
  styleUrl: './registrar-recepcionista.component.css'
})
export class RegistrarRecepcionistaComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  form_registro = new FormGroup({
    path: new FormControl(''),
    imagen: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),  
    correo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required)
  });

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

  imagen: any = '';
  imagen_path: any = '';
  imagen_base64: any = '';
  registro(){
    if(this.form_registro.valid){
      if(this.form_registro.value.password != this.form_registro.value.confirm_password){
        alert('Las contraseñas no coinciden');
      } else
      {const data = this.form_registro.value;
        Object.assign(data, {tipo: 'recepcionista'}); // Object.assign(data, {tipo: 'recepcionista'}
        Object.assign(data, {imagen: this.imagen_base64});
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
                title: 'Error registrar recepcionista',
                text: data.msg || '',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire({
              title: 'Error registrar recepcionista',
              text: 'Error en el servidor',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }}
        );
      }
    } else {
      Swal.fire({
        title: 'Error registrar recepcionista',
        text: 'Campos vacios o incorrectos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onFileSelected(event: any){
    // Seleccionar el archivo y convertirlo a base64
    this.imagen = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      this.imagen_path = event.target.result;
      this.imagen_base64 = reader.result;
    }
    reader.readAsDataURL(this.imagen);
  }
}
