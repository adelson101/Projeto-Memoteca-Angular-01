import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario?: FormGroup;

  constructor( private service: PensamentoService, private router: Router, private route: ActivatedRoute, private FormBuilder: FormBuilder) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(<string>id).subscribe( (pensamento) => {
      this.formulario = this.FormBuilder.group( {
        conteudo: [ pensamento.conteudo , Validators.compose([Validators.required,Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
        autoria: [ pensamento.autoria , Validators.compose([Validators.required,Validators.minLength(3)])],
        modelo: [ pensamento.autoria ]
      } );
    });

  }

  editarPensamento() {
    this.service.editar(this.formulario?.value).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    });
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if(this.formulario?.valid) {
      return "botao"
    }
    else return "botao__desabilitado"
  }

}
