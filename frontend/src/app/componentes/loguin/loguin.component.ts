import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/servicios/message.service';
@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})


 


export class LoguinComponent {
  usuario: string = "";
  password: string = "";
  entrar: boolean = false;
 
 constructor(private router: Router,   private messageService: MessageService) {}
  verificarIngreso() {
    const usuario = this.usuario.trim();
    const password = this.password.trim();
  
    if (usuario === "admin" && password === "123") {
      this.ingresar();
    } else {
      this.messageService.automaticMessageError(`Usuario o contraseña incorrectos`);
   
    }
  }

  ingresar() {
    this.entrar = true;
    this.messageService.automaticMessageOk(`Bienvenido`);
    this.router.navigate(['/home']);
  }

 
}