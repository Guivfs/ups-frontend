import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsAccountService } from './details-account.service';
import { DeleteConfirmationDialogComponent } from './dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UpdateAccountComponent } from './dialog/update/update-account/update-account.component';

@Component({
  selector: 'app-details-account',
  templateUrl: './details-account.component.html',
  styleUrls: ['./details-account.component.css']
})
export class DetailsAccountComponent implements OnInit {
  profileFormUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private detailsAccountService: DetailsAccountService
  ) {
    this.profileFormUser = this.fb.group({
      nomeCompleto: [{ value: '', disabled: true }],
      cpf: [{ value: '', disabled: true }],
      usuario: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      senha: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.detailsAccountService.getUser().subscribe(
      (data) => {
        console.log('user:', data);
        this.profileFormUser.patchValue({
          nomeCompleto: data.nomeUsuario,
          cpf: data.cpfUsuario,
          usuario: data.userUsuario,
          email: data.emailUsuario,
          senha: data.senhaUsuario
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openEditDialog(): void {
    // Remove a referência a `dialogRef` no construtor
    const dialogRef = this.dialog.open(UpdateAccountComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUserDetails(); // Atualiza os dados do usuário após o fechamento do diálogo
      }
    });
  }

  openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAccount();
      }
    });
  }

  deleteAccount(): void {
    this.detailsAccountService.deleteAccount().subscribe(
      response => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erro ao excluir a conta:', error);
      }
    );
  }
}
