import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.scss']
})
export class CallApiComponent implements OnInit {

  message: string = '';
  form?: FormGroup;

  username!: string;
  password!: string;

  data: any = [];

  constructor(private apiService: ApiService,
    private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.apiService.login(this.username, this.password).subscribe(response => {
      console.log('submit', response);
      if (response.token) {
        localStorage.setItem('token', response.token);

        if (ApiService.users.some(user => user.id === this.username)) {
          this.router.navigate(['/query-data']);
        }
      }
    });
  }

}
