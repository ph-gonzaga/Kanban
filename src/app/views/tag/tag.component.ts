import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})

export class TagComponent implements OnInit {

  tags: Array<Tag>;
  tagSelecionada: Tag;
  colunas = ['nome', 'acoes'];
  adicionar = false;

  constructor(private snackBar: MatSnackBar, private tagService: TagService) { }

  ngOnInit(): void {
    this.listar();
  }

  // Método para disparar o snackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

  // Método para criação da tag (adicionar = true)
  novaTag() {
    this.adicionar = true;
    this.tagSelecionada = new Tag();
  }

  // Método para adicionar uma tag, ao clicar no botão correspondente
  addTag() {
    document.getElementById('formCard').classList.remove('card-none');
    this.novaTag();
  }

  // Método para salvar/adicionar ou atualizar uma tag
  salvar() {
    if (this.selecionaTag.name.length > 0 && this.tagSelecionada.nome !== undefined) {
      if (this.adicionar) {
        this.tagService.adicionarTag(this.tagSelecionada).subscribe(() => {
          this.openSnackBar('Tag adicionada com sucesso!', 'Ok');
          this.limpar();
          this.listar();
        });
      } else {
        this.tagService.atualizarTag(this.tagSelecionada).subscribe(() => {
          this.openSnackBar('Tag atualizada com sucesso!', 'Ok');
          this.limpar();
          this.listar();
        });
      }
    } else {
      this.openSnackBar('Por favor, preencha o campo de nome', 'Ok');
    }
  }

  // Método para listar as tags
  listar() {
    this.tagService.listarTags().subscribe( tags => {
        this.tags = tags;
      });
  }

  // Método para limpar/cancelar ao clicar no botão correspondente
  limpar() {
    this.tagSelecionada = null;
    document.getElementById('formCard').classList.add('card-none');
  }

  // Método para excluir uma tag, de acordo com o id
  excluir(id: string) {
    this.tagService.excluirTag(id).subscribe(() => {
      this.openSnackBar('Excluido com sucesso', 'Ok');
      this.listar();
    });
  }

  // Método para selecionar uma tag
  selecionaTag(tag: Tag) {
    this.adicionar = false;
    this.tagSelecionada = tag;
    document.getElementById('formCard').classList.remove('card-none');
  }

}
