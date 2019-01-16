import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../../../../../../_models/empresa.model';
import { GenericService } from '../../../../../../_services/generic.service';
import { Pessoa } from '../../../../../../_models/pessoa.model';
import { Projeto } from '../../../../../../_models/projeto.model';

@Component({
  selector: 'app-atribuicao-equipe',
  templateUrl: './atribuicao-equipe.component.html',
  styleUrls: ['./atribuicao-equipe.component.css']
})
export class AtribuicaoEquipeComponent implements OnInit {

  constructor(private svc: GenericService, private router: Router) { }
  @Output() getProjeto = new EventEmitter<string>();
  nomeProjeto: string;
  filtroPessoa = new Pessoa();

  pessoas: Pessoa[] = [];
  
  ngOnInit() {
  }

  OpenView(projeto: Projeto){
    this.nomeProjeto = projeto.nome;
  }
  cancelar() {
    this.router.navigate(['/template/projetos']);
  }

  salvar(){
    this.getProjeto.emit("2");
  }
  buscaEmpresa(idEmpresa: number) : string{
    let empresaModel : Empresa;
    empresaModel.id = idEmpresa;

    this.svc.obter(empresaModel).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            empresaModel = s.data;
          }
        }
      }
    );
    return empresaModel.nome;
  }
  filtrar() {
    this.filtroPessoa.ativo = true;
    this.svc.listar(Pessoa, this.filtroPessoa).toPromise().then(
      s => {
        if (s.sucesso) {
          if (s.data != null && s.data !== undefined) {
            this.pessoas = s.data;
          }
        }
      }
    );
  }

}
