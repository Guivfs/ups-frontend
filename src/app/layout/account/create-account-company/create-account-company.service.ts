import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountCompanyService {

  constructor(private http:HttpClient) { }

  cadastrarEmpresa(dadosEmpresa:any){
    const body = {
      nomeEmpresa: dadosEmpresa.nomeEmpresa,
      emailEmpresa: dadosEmpresa.emailEmpresa,
      senhaEmpresa: dadosEmpresa.senhaEmpresa,
      descEmpresa: dadosEmpresa.descEmpresa,
      CNPJEmpresa: dadosEmpresa.CNPJEmpresa,
      razaoSocialEmpresa: dadosEmpresa.razaoSocialEmpresa,
      areaAtuacaoEmpresa: dadosEmpresa.areaAtuacaoEmpresa,
      numeroFuncionariosEmpresa: dadosEmpresa.numeroFuncionariosEmpresa,
      ramoEmpresa: dadosEmpresa.ramoEmpresa
    };

    return this.http.post(`${environment.baseUrlBackendProd}/registro-empresa`,body)
  }
}
