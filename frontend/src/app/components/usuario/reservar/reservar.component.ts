import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reservar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './reservar.component.html',
  styleUrl: './reservar.component.css'
})
export class ReservarComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  carros: any = [];
  viajes: any = [];

  ngOnInit(): void {
    console.log("Cargando autos");
    this.cargarAutos();
    this.cargarViajes();
  }

  cargarAutos() {
    console.log("Cargando autos");
    this.usuarioService.consult_get("/admin/autos").subscribe({
      next: (data: any) => {
        if (data.status === true) {
          this.carros = data.data;
        } else {
          Swal.fire({
            title: 'Error al cargar autos',
            text: data.data.msg,
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
}
