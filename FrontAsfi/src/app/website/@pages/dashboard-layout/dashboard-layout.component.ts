import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.css'],

})
export class DashboardLayoutComponent implements OnInit {

    // public sideBarOpen: boolean = true;
    // public isBypass: boolean;
    // public mobile: boolean;
    // public isMenuInitOpen: boolean;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



    constructor(private breakpointObserver: BreakpointObserver, public router: Router) {

    }

 
    public isMenuOpen = true;
    public contentMargin = 240;

    // get isHandset(): boolean {
    //     return this.breakpointObserver.isMatched(Breakpoints.Handset);
    // }

    

    ngOnInit(): void {
    }

    // ngDoCheck() {
    //     if (this.isHandset$) {
    //         this.isMenuOpen = false;
    //     } else {
    //         this.isMenuOpen = true;
    //     }
    // }

    sideBarToggler() {
        //this.sideBarOpen = !this.sideBarOpen;
        console.log('cambio de estado');
        //this.isMenuOpen = !this.isMenuOpen;
                if (this.isHandset$) {
            this.isMenuOpen = false;
        } else {
            this.isMenuOpen = true;
        }
    }

    cerrarSesion() {
        localStorage.clear();
        this.router.navigate([''])
    }


}
