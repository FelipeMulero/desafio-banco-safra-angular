import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SharedDataService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-query-data',
  templateUrl: './query-data.component.html',
  styleUrls: ['./query-data.component.scss']
})
export class QueryDataComponent implements OnInit {

  id!: string;
  data: any = {};

  constructor(private apiService: ApiService,
    private sharedDataService: SharedDataService,
    private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.apiService.getUserById(this.id).subscribe(response => {
      console.log('submit', response);
      this.data = response;
    });
  }

  integrar() {
    this.apiService.integrarDados().subscribe(response => {
      this.sharedDataService.sendData(response);
      alert('Dados integrados com sucesso!');
      this.router.navigate(['/call-data']);

    }, error => {
      alert('Erro ao integrar dados com o banco local.');
    });
  }

}
