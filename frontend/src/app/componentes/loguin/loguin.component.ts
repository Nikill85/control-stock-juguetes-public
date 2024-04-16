import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})


 


export class LoguinComponent {
  usuario: string = "";
  password: string = "";
  entrar: boolean = false;

  verificarIngreso() {
    const usuario = this.usuario.trim();
    const password = this.password.trim();
  
    if (usuario === "admin" && password === "123") {
      this.ingresar();
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  ingresar() {
    this.entrar = true;
    alert("Ingresado!");
    this.router.navigate(['/home']);
  }

  constructor(private router: Router) {}
}