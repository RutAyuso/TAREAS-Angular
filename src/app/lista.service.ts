import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  lista=new Array();
  filtro = "todas";

  constructor() {
    let stringify = localStorage.getItem('lista');
        if(stringify){
            //SI EXISTE UN LOCALSTORAGE LO RECOGE
            this.lista = JSON.parse(stringify);  
        }else{
            this.lista = new Array;
        }
   }
  
   


}
