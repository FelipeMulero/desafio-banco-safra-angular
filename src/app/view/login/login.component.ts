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
    console.log('antes', this.name)
    this.apiService.login(this.name, this.password).subscribe(
      (response) => {
        console.log('resposta:', this.name);

        console.log('ApiService.users.some(user => user.name === this.username)', ApiService.users.some(user => user.name === this.name), ApiService.users)

        if (ApiService.users.some(user => user.name == this.name)) {
          console.log('entrei')
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
