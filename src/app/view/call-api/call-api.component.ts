import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { SharedDataService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-call-api',
  templateUrl: './call-api.component.html',
  styleUrls: ['./call-api.component.scss']
})
export class CallApiComponent implements OnInit {
  user: any = { id: '', name: '', email: '' };

  message: string = '';
  form?: FormGroup;

  username!: string;
  password!: string;

  data: any = [];

  constructor(private apiService: ApiService,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router) {}

    users: any[] = [];


    ngOnInit() {
      this.sharedDataService.getData().subscribe(data => {
        this.data = data;
        console.log('deu certo-------------------', this.data)
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

    saveUser() {
      this.apiService.updateUser(this.user.id, this.user).subscribe(
        () => {
          this.router.navigate(['/user-list']);
        },
        (error) => {
          console.error('Erro ao salvar usuário:', error);
        }
      );
    }
  }
