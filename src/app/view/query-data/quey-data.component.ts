import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-query-data',
  templateUrl: './query-data.component.html',
  styleUrls: ['./query-data.component.scss']
})
export class QueryDataComponent implements OnInit {

  id!: string;
  data: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  onSubmit() {
    this.apiService.getUserById(this.id).subscribe(response => {
      console.log('submit', response);
      this.data = response;
    });
  }

}
