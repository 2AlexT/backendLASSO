import { Component, OnInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from './modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],

})
export class DashboardLayoutComponent implements OnInit {

  mostrar: boolean = false!
  // public sideBarOpen: boolean = true;
  // public isBypass: boolean;
  // public mobile: boolean;
  // public isMenuInitOpen: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public dialog: MatDialog,
  ) { }

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
    localStorage.removeItem('auth');
    this.router.navigate([''])
  }

  email() {
    console.log('recibiendo Email ')
  }
  // Modal
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: '' });
    dialogRef.afterClosed().subscribe(res => { console.log(res); }); //Opcional show
  }
}
