import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { AnalyticsComponent } from "./analytics/analytics.component";
import { CrmComponent } from "./crm/crm.component";
import { ProjectsComponent } from "./projects/projects.component";
import { JobComponent } from './job/job.component';

const routes: Routes = [
    {
        path: "analytics",
        component: AnalyticsComponent
    },
    {
        path: "crm",
        component: CrmComponent,
        title: 'Merkava',



    },

    {
        path: "crmx",
        component: CrmComponent,
        title: 'Orkaha',



    },


    {
        path: "projects",
        component: ProjectsComponent
    },

    {
        path: "job",
        component: JobComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardsRoutingModule { }
