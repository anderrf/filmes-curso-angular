import { Alerta } from './../../shared/models/alerta';
import { FilmesService } from './../../core/filmes.service';
import { Filme } from './../../shared/models/filme';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  public cadastro: FormGroup;
  generos: Array<String>;

  constructor(
    public validacao: ValidarCamposService,
    private fb: FormBuilder,
    private filmesService: FilmesService,
    public dialog: MatDialog
  ) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
    this.generos = ['Ação', 'Aventura', 'Comédia', 'Drama', 'Ficção científica', 'Romance', 'Terror'];
  }

  submit(): void{
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;
    }
    else{
      const filme = this.cadastro.getRawValue() as Filme;
      this.salvar(filme);
    }
  }

  reiniciarForm(): void{
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void{
    this.filmesService.salvar(filme).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuiBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
    },
    () => {
      alert("Erro ao salvar");
    });
  }

}
