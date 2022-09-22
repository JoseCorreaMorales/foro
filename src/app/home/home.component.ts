import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service'; /* imparatando el componete de api rest
para usar el getTopics*/


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topics = [{id:0, title:'', user_id:0}, {id:1, title:'redes', user_id:2}];//datos del json para paginacion
  
  newTopic = {id:0, title:'', user_id:0};/* CREAR un nuevo tema */

    pages = [{url:'', label:'', active:false}]/* paginacion  URL, LABEL Y ACTIVE (del json)*/

  tmpTopic = {id:0, title:'', user_id:0}; //editar un tema seleccionado (click)


  user = { id: 0, username: '', role: '' };

  constructor(private rest: ApiRestService) { }

  ngOnInit(): void {//cuando se contrulle 
    this.readTopics();
    this.rest.userObs$.subscribe(user => {this.user = user;});//para saber quen inicio secion
  }


  readTopics(url:string=''){/*  */
    this.rest.getTopics(url).subscribe(
      respuesta => { /* respueta del json */
        this.topics = respuesta.data;
        this.pages = respuesta.links;      /* links es un paramentro del json */
      } 
      /* e=>{} */
    );
  }

   
  createTopic(){
    this.rest.postTopic(this.newTopic).subscribe(
      respuesta =>{
        this.readTopics();
      }
      /* e=>{} */
    );
  }



  selectTmpTopic(topic:any){
    this.tmpTopic = JSON.parse(JSON.stringify(topic)) ;//convert json to string
  }

  updateTopic(){
    this.rest.putTopic(this.tmpTopic).subscribe(
      r =>{
        this.readTopics();
      }
     /*  r=>{
        //error
      } */
    );

  }

  deleteTopic(){
    this.rest.deleteTopic(this.tmpTopic).subscribe(
      r =>{
        this.readTopics();
      }
     /*  r=>{
        //error
      } */
    );
  }

}
