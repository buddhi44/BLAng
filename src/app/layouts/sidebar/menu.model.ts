export class MenuItem {
  id?: number;
  menuCaption?: any;
  icon?: string;
  link?: string;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
    isLayout?: boolean;
   
}
export class BLMenuItem {
    menuId?: number=1;
    menuCaption?: any;
    customeStyle?: string;
    routerLink?: string;
    subMenus: BLMenuItem[]=[];
    isTitle?: boolean;
    controllerName?: string='';
    controllerAction?: string='';
    
    parentId?: number;
    isLayout?: boolean;
    getAccessPath() {
        
    }
}