import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterOutlet,RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-autos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './autos.component.html',
  styleUrl: './autos.component.css'
})
export class AutosComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  form_registro = new FormGroup({
    nombre_agencia: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    placa: new FormControl('', Validators.required), 
    modelo: new FormControl('', Validators.required), 
    precio: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required)
  });

  registro(){
    if(this.form_registro.valid){
      const data = this.form_registro.value;
      console.log(data);
      this.usuarioService.consult_post('/admin/registroAutos', data).subscribe({
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
              title: 'Error al registrar auto',
              text: data.msg || '',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error: (error: any) => {
          Swal.fire({
            title: 'Error al registrar auto',
            text: 'Error en el servidor',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error al registrar auto',
        text: 'Por favor, llene todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
