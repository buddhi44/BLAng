import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from '../../core/guards/auth.guard';
import { MenuService } from '../../core/services/menu.service';
import { CrmComponent } from '../../pages/dashboards/crm/crm.component';

import { LayoutComponent } from '../layout.component';

import { MENU } from './menu';
import { BLMenuItem, MenuItem } from './menu.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    menu: any;
    toggle: any = true;
    //menuItems: MenuItem[] = [];
    blmenuItems: BLMenuItem[] = [];
    @ViewChild('sideMenu') sideMenu!: ElementRef;
    @Output() mobileMenuButtonClicked = new EventEmitter();

    constructor(private router: Router, public translate: TranslateService, private menuService:MenuService) {
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {
        // Menu Items
       // this.menuItems = MENU;
        let menu = new BLMenuItem();
        menu.menuId = 1;
        menu.menuCaption = 'Menu';
        menu.isTitle = true;        
 
        let menu2 = new BLMenuItem();  
        menu2.menuId = 2;
        menu2.menuCaption = 'Dashboard';
        menu2.customeStyle = 'las la-tachometer-alt';
        this.blmenuItems.push(menu);
        this.blmenuItems.push(menu2);

        let menu3 = new BLMenuItem();
      
        menu3.menuId = 2;
        menu3.menuCaption = 'CRM';
        menu3.routerLink = '/crm';
        menu3.customeStyle = 'las la-tachometer-alt';
        menu2.subMenus.push(menu3);

        let menu4 = new BLMenuItem();
      
        menu4.menuId = 4;
        menu4.menuCaption = 'CRMX';
        menu4.routerLink = '/crmx';
        menu4.customeStyle = 'las la-chart-area';
        this.blmenuItems.push(menu4);
        this.menuService.retriveMenuDetails().subscribe((data) => {

            this.blmenuItems = data.subMenus;
            //this.router.config.splice(0, this.router.config.length);
            //this.router.config.push({ path: '', component: LayoutComponent, loadChildren: () => import('src/app/pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard], canActivateChild: [AuthGuard] },);


        
         
        });

        

    }


    getAccessPath(menuItem: BLMenuItem) {

        let accessPath = menuItem.controllerName + '/' + menuItem.controllerAction;

        let ObjectView = menuItem.routerLink + '?objKy=' + menuItem.menuId?.toString();
        return accessPath;

    }
    /***
     * Activate droup down set
     */
    ngAfterViewInit() {
        this.initActiveMenu();
    }

    removeActivation(items: any) {
        items.forEach((item: any) => {
            if (item.classList.contains("menu-link")) {
                if (!item.classList.contains("active")) {
                    item.setAttribute("aria-expanded", false);
                }
                (item.nextElementSibling) ? item.nextElementSibling.classList.remove("show") : null;
            }
            if (item.classList.contains("nav-link")) {
                if (item.nextElementSibling) {
                    item.nextElementSibling.classList.remove("show");
                }
                item.setAttribute("aria-expanded", false);
            }
            item.classList.remove("active");
        });
    }


    gotoComponent(menuItem: BLMenuItem) {
        this.router.navigateByUrl(`${this.getAccessPath(menuItem)}?ObjKy=${menuItem.menuId}`);
    }

    toggleSubItem(event: any) {
        let isCurrentMenuId = event.target.closest('a.nav-link');
        let isMenu = isCurrentMenuId.nextElementSibling as any;
        if (isMenu.classList.contains("show")) {
            isMenu.classList.remove("show");
            isCurrentMenuId.setAttribute("aria-expanded", "false");
        } else {
            let dropDowns = Array.from(document.querySelectorAll('.sub-menu'));
            dropDowns.forEach((node: any) => {
                node.classList.remove('show');
            });

            let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
            subDropDowns.forEach((submenu: any) => {
                submenu.setAttribute('aria-expanded', "false");
            });

            if (event.target && event.target.nextElementSibling) {
                isCurrentMenuId.setAttribute("aria-expanded", "true");
                event.target.nextElementSibling.classList.toggle("show");
            }
        }
    };

    toggleExtraSubItem(event: any) {
        let isCurrentMenuId = event.target.closest('a.nav-link');
        let isMenu = isCurrentMenuId.nextElementSibling as any;
        if (isMenu.classList.contains("show")) {
            isMenu.classList.remove("show");
            isCurrentMenuId.setAttribute("aria-expanded", "false");
        } else {
            let dropDowns = Array.from(document.querySelectorAll('.extra-sub-menu'));
            dropDowns.forEach((node: any) => {
                node.classList.remove('show');
            });

            let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
            subDropDowns.forEach((submenu: any) => {
                submenu.setAttribute('aria-expanded', "false");
            });

            if (event.target && event.target.nextElementSibling) {
                isCurrentMenuId.setAttribute("aria-expanded", "true");
                event.target.nextElementSibling.classList.toggle("show");
            }
        }
    };

    // Click wise Parent active class add
    toggleParentItem(event: any) {
      
        let isCurrentMenuId = event.target.closest('a.nav-link');
        let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
        dropDowns.forEach((node: any) => {
            node.classList.remove('show');
        });
        const ul = document.getElementById("navbar-nav");
        if (ul) {
            const iconItems = Array.from(ul.getElementsByTagName("a"));
            let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
            activeIconItems.forEach((item: any) => {
                item.setAttribute('aria-expanded', "false")
                item.classList.remove("active");
            });
        }
        isCurrentMenuId.setAttribute("aria-expanded", "true");
        if (isCurrentMenuId) {
            this.activateParentDropdown(isCurrentMenuId);
        }
    }

    toggleItem(event: any) {
        let isCurrentMenuId = event.target.closest('a.nav-link');
        let isMenu = isCurrentMenuId.nextElementSibling as any;
        if (isMenu.classList.contains("show")) {
            isMenu.classList.remove("show");
            isCurrentMenuId.setAttribute("aria-expanded", "false");
        } else {
            let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
            dropDowns.forEach((node: any) => {
                node.classList.remove('show');
            });
            (isMenu) ? isMenu.classList.add('show') : null;
            const ul = document.getElementById("navbar-nav");
            if (ul) {
                const iconItems = Array.from(ul.getElementsByTagName("a"));
                let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
                activeIconItems.forEach((item: any) => {
                    item.setAttribute('aria-expanded', "false")
                    item.classList.remove("active");
                });
            }
            isCurrentMenuId.setAttribute("aria-expanded", "true");
            if (isCurrentMenuId) {
                this.activateParentDropdown(isCurrentMenuId);
            }
        }
    }

    // remove active items of two-column-menu
    activateParentDropdown(item: any) {
        item.classList.add("active");
        let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

        if (parentCollapseDiv) {
            // to set aria expand true remaining
            parentCollapseDiv.classList.add("show");
            parentCollapseDiv.parentElement.children[0].classList.add("active");
            parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
            if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
                parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                    parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
                if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
                    parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").classList.add("show");
                    parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList.add("active");
                }
            }
            return false;
        }
        return false;
    }

    updateActive(event: any) {
        const ul = document.getElementById("navbar-nav");
        if (ul) {
            const items = Array.from(ul.querySelectorAll("a.nav-link"));
            this.removeActivation(items);
        }
        this.activateParentDropdown(event.target);
    }

    initActiveMenu() {
        const pathName = window.location.pathname;
        const ul = document.getElementById("navbar-nav");
        if (ul) {
            const items = Array.from(ul.querySelectorAll("a.nav-link"));
            let activeItems = items.filter((x: any) => x.classList.contains("active"));
            this.removeActivation(activeItems);

            let matchingMenuItem = items.find((x: any) => {
                return x.pathname === pathName;
            });
            if (matchingMenuItem) {
                this.activateParentDropdown(matchingMenuItem);
            }
        }
    }

    /**
     * Returns true or false if given menu item has child or not
     * @param item menuItem
     */
    hasItems(item: BLMenuItem) {
        return item.subMenus !== undefined ? item.subMenus.length > 0 : false;
    }

    /**
     * Toggle the menu bar when having mobile screen
     */
    toggleMobileMenu(event: any) {
        var sidebarsize = document.documentElement.getAttribute("data-sidebar-size");
        if (sidebarsize == 'sm-hover-active') {
            document.documentElement.setAttribute("data-sidebar-size", 'sm-hover')
        } else {
            document.documentElement.setAttribute("data-sidebar-size", 'sm-hover-active')
        }
    }

    /**
     * SidebarHide modal
     * @param content modal content
     */
    SidebarHide() {
        document.body.classList.remove('vertical-sidebar-enable');
    }

}
