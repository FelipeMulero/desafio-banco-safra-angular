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

  dataStorage: any;

  constructor(private apiService: ApiService,
    private sharedDataService: SharedDataService,
    private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.apiService.getUserById(this.id).subscribe(response => {
      this.data = response;
      console.error('local storage', this.data)
      if(this.data > [0]) {
        this.dataStorage = this.data;
        console.log('local storage', this.dataStorage)
      }

    });
  }

  integrar() {
    this.apiService.integrarDados().subscribe(response => {
      this.sharedDataService.sendData(response);
      alert('Dados integrados com sucesso!');
      localStorage.setItem("dadosIntegrados", JSON.stringify(this.dataStorage[0]));
      this.router.navigate(['/call-data']);

    }, error => {
      alert('Erro ao integrar dados com o banco local.');
    });

  }

}
