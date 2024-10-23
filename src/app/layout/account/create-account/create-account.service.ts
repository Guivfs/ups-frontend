import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  constructor(private http: HttpClient) {}

  cadastrarUsuario(dadosUsuario: any) {
    const body = {
      nomeUsuario: dadosUsuario.nomeCompleto,
      userUsuario: dadosUsuario.usuario,
      senhaUsuario: dadosUsuario.senha, 
      cpfUsuario: dadosUsuario.cpf,
      emailUsuario: dadosUsuario.email
    };

    return this.http.post(`${environment.baseUrlBackendProd}/registro-usuario`, body);
  }
}
