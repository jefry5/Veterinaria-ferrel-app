import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoadingService } from '@core/services/loading-page/loading.service';
import { SideBarComponent } from '@shared/components/side-bar/side-bar.component';
import { LoadingPageComponent } from "./shared/components/loading-page/loading-page.component";
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideBarComponent, CommonModule, LoadingPageComponent, ToastModule, RippleModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'veterinaria-ferrel-app';
  isAuthPage: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private loadingService: LoadingService) { }

  ngOnInit(): void {
    //Verificamos si estamos en la ruta "/auth" y lo guarda
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.startsWith('/auth')) {
          this.isAuthPage = true;
        } else {
          this.isAuthPage = false;
        }
      });

    //Verificamos si estamos en una pantalla de carga (isLoading)
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
