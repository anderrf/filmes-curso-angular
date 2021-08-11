import { ConfigParams } from './../../shared/models/config-params';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  config: ConfigParams = {
    pagina: 0,
    limite: 4
  }
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });
    this.filtrosListagem.get('texto').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      });
    this.filtrosListagem.get('genero').valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.campo = {tipo: 'genero', valor: val};
        this.resetarConsulta();
      });
    this.generos = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção científica', 'Romance', 'Terror'];
    this.listarFilmes();
  }

  onScroll(): void{
   this.listarFilmes();
  }

  private listarFilmes(): void{
    this.config.pagina++;
    this.filmesService.listar(this.config).subscribe((filmes: Filme[]) => this.filmes.push(...filmes));
  }

  private resetarConsulta(): void{
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
