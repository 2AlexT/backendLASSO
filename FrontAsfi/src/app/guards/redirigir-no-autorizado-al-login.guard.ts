import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class RedirigirNoAutorizadoAlLoginGuard implements CanActivate {

	constructor(
		public authService: AuthService,
		public router: Router
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const autenticado = this.authService.estaAutenticado();
		console.log(autenticado);
		if (autenticado === false || autenticado === undefined) {
			this.router.navigate([''])
		}
		return true;
	}

}
