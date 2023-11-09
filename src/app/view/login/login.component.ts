import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name!: string;
  password!: string;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.apiService.login().subscribe(
      (response) => {
        if (ApiService.users.some(user => user.name == this.name)) {
          this.router.navigate(['/query-data']);
          localStorage.setItem('token', JSON.stringify(response));
        }
      },
      (error) => {
        console.error('Erro:', error);
        alert('Erro ao autenticar usuário');
      }
    );
  }
}
