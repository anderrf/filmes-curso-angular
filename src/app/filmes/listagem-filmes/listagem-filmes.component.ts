import { FormGroup, FormBuilder } from '@angular/forms';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina = 4;
  pagina = 0;
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });
    this.generos = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção científica', 'Romance', 'Terror'];
    this.listarFilmes();
  }

  onScroll(): void{
   this.listarFilmes();
  }

  private listarFilmes(): void{
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina).subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

}
