import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { OrderComponent } from './order/order/order.component';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },


    {
        path: 'Order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
    },
    //{
    //  path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
    //},
    //{
    //  path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
    //},
    //{
    //  path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
    //},
    //{
    //  path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
    //},
    //{
    //  path: 'crm', loadChildren: () => import('./crm/crm.module').then(m => m.CrmModule)
    //},

    //{
    //  path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)
    //},
    //{
    //  path: 'tickets', loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
    //},
    //{
    //  path: 'pages', loadChildren: () => import('./extrapages/extraspages.module').then(m => m.ExtraspagesModule)
    //},
    
    //{
    //  path: 'advance-ui', loadChildren: () => import('./advance-ui/advance-ui.module').then(m => m.AdvanceUiModule)
    //},
    //{
    //  path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    //},
    //{
    //  path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    //},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
