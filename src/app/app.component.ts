import { Component, OnInit } from '@angular/core';
import { ListaService } from './lista.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  s:ListaService;
  

  constructor(s:ListaService) {
    this.s = s;

   }
/*--------------------BOTON BORRAR---------------------*/
  borrar(i:number){
    this.s.lista.splice(i,1);
    this.ordenar();
    localStorage.setItem('lista', JSON.stringify(this.s.lista));//AÑADIR AL LOCAL STORAGE
  }
/*--------------------BOTON COMPLETAR-------------------*/
  cambiarEstado(i:number){
    this.s.lista[i].estado = !this.s.lista[i].estado;
    this.ordenar();
    localStorage.setItem('lista', JSON.stringify(this.s.lista));//AÑADIR AL LOCAL STORAGE
    
  }
/*--------------------BOTON PRIORIDAD-------------------*/
  cambiarPrioridad(n:number, i:number){
    if(n==0){
      this.s.lista[i].prioridad = n;/*prioridad 0*/
    }
    else if(n==1){
      this.s.lista[i].prioridad = n;/*prioridad 1*/
    }
    else if(n==2){
      this.s.lista[i].prioridad = n;/*prioridad 2*/
    }
    this.ordenar();
    localStorage.setItem('lista', JSON.stringify(this.s.lista));//AÑADIR AL LOCAL STORAGE
  }

  /*---------------------FILTRO BOTONES-------------------------*/

  cambiaFiltro(n:number){
    if(n==1){
      this.s.filtro = "todas";/*BOTON TODAS*/
    }
    else if(n==2){
      this.s.filtro = "completadas";/*BOTON COMPLETADAS*/
    }
    else if(n==3){
      this.s.filtro = "incompletas";/*BOTON INCOMPLETAS*/
    }

    // console.log(this.s.filtro);
    
  }

  filtro(){/*SEGUN LO INDICADO ANTERIORMENTE CON LOS BOTONES*/
    let filtrado = new Array() ;

    if(this.s.filtro == "todas"){
      filtrado = this.s.lista;/*TODA LA LISTA*/
      

    }

    else if(this.s.filtro =="completadas"){
      this.s.lista.forEach(tarea => {
        if(tarea.estado == false){/*COMPLETADAS*/
          filtrado.push(tarea);
        }
      });
    }

    else if(this.s.filtro == "incompletas"){
      this.s.lista.forEach(tarea => {
        if(tarea.estado == true){/*COMPLETAS*/
          filtrado.push(tarea);
        } 
      });
    }

    return filtrado.sort(this.comparar);/*devuelve array filtrado*/
    
  }
  /*---------------------------FIN FILTRO BOTONES-----------------------*/

  /*BOTON COMPLETADAS*/
  borrarTodasCompletas(){
    this.s.lista = this.s.lista.filter(function(nota){
      return nota.estado;

  });
  this.ordenar();
  localStorage.setItem('lista', JSON.stringify(this.s.lista));//AÑADIR AL LOCAL STORAGE

  }

  /*---------ORDENAR-----------------------------------------------------*/
  comparar(a:any, b:any) {
    return (b.prioridad-a.prioridad)
  };

  ordenar(){
    this.s.lista.sort(this.comparar);
  };


  /*CONTADOR TAREAS COMPLETADAS*/
  contadorCompletadas(){
    let contador = 0;
    for(let t=0; t<this.s.lista.length; t++){
      if(this.s.lista[t].estado==false){
        contador+=1;
      }
      
    }
    return contador;
  }

  ngOnInit(): void {
  }
  
}


