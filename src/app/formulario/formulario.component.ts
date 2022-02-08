import { Component, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  desc="";
  s:ListaService;
  mes = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  constructor(s:ListaService) {
    this.s = s;
   }

  anadir(){
    let fecha = new Date();

    if(this.desc){
      this.s.lista.push({
        desc: this.desc,
        fecha: fecha.getDate() + " - " + this.mes[fecha.getMonth()] + " - " + fecha.getFullYear(),
        prioridad: 0,
        estado: true,

      })
    }

    localStorage.setItem('lista', JSON.stringify(this.s.lista));//AÑADIR AL LOCAL STORAGE

  }

  

  

  ngOnInit(): void {
  }

}
