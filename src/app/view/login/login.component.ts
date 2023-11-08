import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private apiService: ApiService,
    private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    const response = this.apiService.login(this.username, this.password);

    if (!response) {
      alert('Erro ao autenticar usuário');
      return;
    }

    console.log('submit', response);
    if (response) {
      if (ApiService.users.some(user => user.id === '1')) {
        this.router.navigate(['/query-data']);
      } else {
        alert('Usuário ou senha inválidos');
      }
    } else {
      alert('Usuário ou senha inválidos');
    }

    localStorage.setItem('token', JSON.stringify(response));

    return response;
  }
}
