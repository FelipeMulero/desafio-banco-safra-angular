import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SharedDataService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-data.component.html',
  styleUrls: ['./call-data.component.scss']
})
export class CallApiComponent implements OnInit {
  user: any = { id: '', name: '', email: '', age: 0, gender: '' };

  message: string = '';
  form?: FormGroup;

  username!: string;
  password!: string;
  users: any[] = [];

  data: any = [];

  constructor(private apiService: ApiService,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit() {
      this.sharedDataService.getData().subscribe(data => {
        this.data = data;
      });

      this.apiService.getUsers().subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.error('Erro ao obter usuários:', error);
        }
      );

      const userId = this.route.snapshot.paramMap.get('id');

      if (userId) {
        this.apiService.getUserById(userId).subscribe(
          (response) => {
            this.user = response;
          },
          (error) => {
            console.error('Erro ao obter usuário:', error);
          }
        );
      }

      const dadosIntegrados = localStorage.getItem("dadosIntegrados");

      if (dadosIntegrados) {
        const dados = JSON.parse(dadosIntegrados);

        this.user.name = dados.name;
        this.user.email = dados.email;
        this.user.age = dados.age;
        this.user.gender = dados.gender;

        this.users = dados.users;
      }
    }

    editUser(id: string) {
      this.router.navigate(['/edit-user', id]);
    }

    deleteUser(id: string) {
      this.apiService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        (error) => {
          console.error('Erro ao excluir usuário:', error);
        }
      );
    }

    returnUser() {
      this.router.navigate(['/query-data']);
    }
  }
