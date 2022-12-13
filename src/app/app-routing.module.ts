import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WithdrawComponent } from './withdraw/withdraw.component';



const routes: Routes = [
  //LoginComponent
  {
    path: '', component: LoginComponent
  },
  //DashboardComponent
  {
    path: 'dashboard', component: DashboardComponent
  },
  //RegisterComponent 
  {
    path: 'register', component: RegisterComponent
  },
  //DepositComponent
  {
    path: 'deposit', component: DepositComponent
  },
  //WithdrawComponent
  {
    path: 'withdraw', component: WithdrawComponent
  },
  //TransactionComponent
  {
    path: 'transaction', component: TransactionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
