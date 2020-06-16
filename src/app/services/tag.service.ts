import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TagService {

  constructor(private http: HttpClient) { }

  // Adicionar tag
  adicionarTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/tag`, tag);
  }

  // Atualizar tag
  atualizarTag(tag: Tag): Observable<any> {
    const id = tag._id;
    delete tag._id;
    return this.http.put(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/tag` + `/${id}`, tag);
  }

  // Listar tags
  listarTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/tag`);
  }

  // Excluir tag
  excluirTag(id: string): Observable<any> {
    return this.http.delete(`https://crudcrud.com/api/cfe9abfee9ac4bcdbb659b3e7e3ae7ef/tag` + `/${id}`);
  }
}
