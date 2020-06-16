import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  constructor(private http: HttpClient) { }

  // Retorna um card
  buscaCard(id: string): Observable<Card> {
    return this.http.get<Card>(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/card` + `/${id}`);
  }

  // Adicionar card
  adicionarCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/card`, card);
  }

  // Atualizar card
  atualizarCard(card: Card): Observable<any> {
    const id = card._id;
    delete card._id;
    return this.http.put(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/card` + `/${id}`, card);
  }

  // Listar cards
  listarCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/card`);
  }

  // Excluir card
  excluirCard(id: string): Observable<any> {
    return this.http.delete(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/card` + `/${id}`);
  }
}
