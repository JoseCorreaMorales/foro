import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:string ="admin";
  pass:string ="123";


  constructor(private rest: ApiRestService, private router: Router, private nsg: ToastrService) { }

  ngOnInit(): void {
  }
  
  entrar(){
  /*   alert("" + this.user +" " + this.pass); */
    this.rest.login(this.user, this.pass).subscribe(
      //response => {
        /* this.entrar.arguments.setUser(response.user);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        this.nsg.success('Bienvenido'); */
        /* guarada r le token de validadacion del login */

        response => {
          this.rest.setUser(response.user);
          localStorage.setItem('token', response.token)
          this.router.navigate(['/home']);
          this.nsg.success("Bienvenido");
        
      },
      error => {
          /* alert("error"); */
        this.nsg.error("Credenciales incorrectas");
      }
    );
  }

}
