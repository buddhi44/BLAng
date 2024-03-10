import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    menuCaption: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    menuCaption: 'Dashboards',
    icon: 'las la-tachometer-alt',
    subItems: [
      {
        id: 3,
        label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
        link: '/analytics',
        parentId: 2
      },
      {
        id: 4,
        label: 'VRM',
        link: '/crm?p=1',
        parentId: 2
      },
     
    
      {
        id: 7,
        label: 'MENUITEMS.DASHBOARD.LIST.PROJECTS',
        link: '/projects',
        parentId: 2
      },
 
      {
        id: 8,
        label: 'MENUITEMS.DASHBOARD.LIST.JOB',
        link: '/job',
        parentId: 2,
      }
    ]
  },


];
