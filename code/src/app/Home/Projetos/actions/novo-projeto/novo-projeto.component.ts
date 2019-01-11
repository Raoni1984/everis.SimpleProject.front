import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DadosPrincipaisComponent } from './actions/dados-principais/dados-principais.component';
import { TabsetComponent } from 'ngx-bootstrap';
import { AtribuicaoEquipeComponent } from './actions/atribuicao-equipe/atribuicao-equipe.component';
import { AnexosComponent } from './actions/anexos/anexos.component';
import { Projeto } from '../../../../_models/projeto.model';
import { Change } from 'src/app/_models/change.model';
import { GenericService } from '../../../../_services/generic.service';

@Component({
  selector: 'app-novo-projeto',
  templateUrl: './novo-projeto.component.html',
  styleUrls: ['./novo-projeto.component.css']
})
export class NovoProjetoComponent implements OnInit {

  @ViewChild(DadosPrincipaisComponent) formDados: DadosPrincipaisComponent;
  @ViewChild(AtribuicaoEquipeComponent) formAtribuicaoEquipe: AtribuicaoEquipeComponent;
  @ViewChild(AnexosComponent) formAnexo: AnexosComponent;
  @ViewChild('alterarTabs') alterarTabs: TabsetComponent;


  constructor(private router: Router, private arouter: ActivatedRoute, private svc: GenericService) { }

  id: number;
  changes: Array<Change>;
  filtroChange = new Change();
  filtroProjeto = new Projeto();
  totalChanges: number;
  projeto: Projeto;

  ngOnInit() {
    this.arouter.paramMap.subscribe(res => {
      this.id = +res.get('id');
    });

    this.filtroChange.projetoId = this.id;
    this.filtroChange.ativo = true;
    this.svc.listar(Change, this.filtroChange)
      .toPromise().then(
        (result) => {
          this.changes = result.data;
          this.totalChanges = this.changes.length;
        }
      );

    if (this.id > 0) {
      this.filtroProjeto.id = this.id;

      this.svc.obter(this.filtroProjeto)
        .toPromise().then(
          (result) => {
            this.projeto = result.data;
            this.formDados.OpenView(this.projeto);
          },
          (error) => {
          }
        );
    }
  }
  cancelar() {
    this.router.navigate(['/template/projetos']);
  }
  Adicionar() {
    this.formDados.Adicionar();
    this.selectTab(1);
  }
  selectTab(tabId: number) {
    if (tabId == 1) {
      this.formAtribuicaoEquipe.OpenView("teste")
    } else if (tabId == 2) {
      this.formAnexo.OpenView("teste")
    }
    this.alterarTabs.tabs[tabId].active = true;
  }

  novaChange() {
    this.router.navigate([`template/projetos/novo-projeto/changes/${this.id}`]);
  }
}