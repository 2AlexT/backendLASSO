import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
    @Output() sideBar: EventEmitter<MatDrawer> = new EventEmitter();
    constructor(public router: Router) {
        this.sideBar.emit();
     }

    ngOnInit(): void {
    }

    cerrarSesion() {
        localStorage.clear()
        console.log("ESTE ES EL BOTON CERRAR SESION")
        console.log(localStorage.getItem('accessToken'))

        this.router.navigate([''])
    }

    toggleSideBar() {
        console.log('cambio de estado 2');
        this.toggleSideBarForMe.emit();
        setTimeout(() => {
            window.dispatchEvent(
                new Event('resize')
            );
        }, 300);
    }
}
