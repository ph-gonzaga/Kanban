import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Card } from 'src/app/models/card';
import { Tag } from 'src/app/models/tag';
import { CardService } from 'src/app/services/card.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  tarefaSelecionada: Card;
  tags: Array<Tag>;
  todo: Array<Card>;
  doing: Array<Card>;
  done: Array<Card>;
  inserir = false;
  err = false;

  constructor(private snackBar: MatSnackBar, private cardService: CardService, private tagService: TagService) { }

  ngOnInit(): void {
    this.listar();
    this.listarTags();
  }

  // Método para disparar o snackBar
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  // Método de validações
  validacoes() {
    if (this.tarefaSelecionada.nome === undefined) {
      this.openSnackBar('Por favor, preencha o nome', 'Ok');
      this.err = true;
    } else if (this.tarefaSelecionada.descricao === undefined) {
      this.openSnackBar('Por favor, preencha a descrição', 'Ok');
      this.err = true;
    } else {
      this.err = false;
    }
  }

  // Método para adicionar um card, ao clicar no botão correspondente
  addCard() {
    document.getElementById('formCard').classList.remove('card-none');
    this.novoCard();
  }

  // Método para criação do card (inserir = true)
  novoCard() {
    this.inserir = true;
    this.tarefaSelecionada = new Card();
  }

  // Método para salvar/adicionar ou atualizar um card
  salvar() {
    this.validacoes();
    if (!this.err) {
      if (this.inserir) {
        this.tarefaSelecionada.board = 1;
        this.cardService.adicionarCard(this.tarefaSelecionada).subscribe(() => {
          this.openSnackBar('Card adicionado com sucesso', 'OK');
          this.limpar();
          this.listar();
        });
      } else {
        this.cardService.atualizarCard(this.tarefaSelecionada).subscribe(() => {
          this.openSnackBar('Card atualizado com sucesso', 'OK');
          this.limpar();
          this.listar();
        });
      }
    }
  }

  // Método para excluir um card, de acordo com o id
  excluir(id: string) {
    this.cardService.excluirCard(id).subscribe(() => {
      this.openSnackBar('Card excluido com sucesso', 'OK');
      this.listar();
    });
  }

  // Método para listar os cards, de acordo com a coluna em que se encontram
  listar() {
    this.cardService.listarCards().subscribe(cards => {
      this.todo = cards.filter((todo) => {
        return todo.board === 1;
      });
      this.doing = cards.filter((doing) => {
        return doing.board === 2;
      });
      this.done = cards.filter((done) => {
        return done.board === 3;
      });
    });
  }

  // Método para listar as tags vinculadas aos cards
  listarTags() {
    this.tagService.listarTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  // Método para selecionar um card
  selecionarTarefa(card: Card) {
    this.inserir = false;
    this.tarefaSelecionada = card;
    document.getElementById('formCard').classList.remove('card-none');
  }

  // Método para limpar/cancelar ao clicar no botão correspondente
  limpar() {
    this.tarefaSelecionada = null;
    document.getElementById('formCard').classList.add('card-none');
  }

  // Método com as operações de drag and drop
  dragDrop(event: CdkDragDrop<string[]>) {
    const element = event.item.element.nativeElement;
    const elementId = element.id;
    let cardNovoBoard: number;
    const quadroAtual = event.container.element.nativeElement.id;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      if (quadroAtual === 'todo') {
        cardNovoBoard = 1;
      } else if (quadroAtual === 'doing') {
        cardNovoBoard = 2;
      } else {
        cardNovoBoard = 3;
      }

      this.cardService.buscaCard(elementId).subscribe(card => {
        card.board = cardNovoBoard;
        this.cardService.atualizarCard(card).subscribe(() => {
          this.openSnackBar('Card movido com sucesso!', 'OK');
        });
      });
    }
  }
}
