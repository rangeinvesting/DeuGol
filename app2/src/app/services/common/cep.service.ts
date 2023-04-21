import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import {Cep} from "./cep";


@Injectable()
export class CepService {
  //resultado:Cep;
  constructor(private http:HttpClient) {}

    buscar(cep:string){
      return this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          //.subscribe(data => data);

    }

    private converterRespostaParaCep(cepNaResposta: any){
       /* let cep = new Cep();

        cep.cep = cepNaResposta.cep;
        cep.logradouro = cepNaResposta.logradouro;
        cep.complemento = cepNaResposta.complemento;
        cep.bairro = cepNaResposta.bairro;
        cep.cidade = cepNaResposta.localidade;
        cep.estado = cepNaResposta.uf;
        return cep;*/
    }

}