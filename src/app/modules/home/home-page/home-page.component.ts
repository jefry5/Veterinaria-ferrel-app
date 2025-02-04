import { Component } from '@angular/core';
import { RolesService } from '@core/services/roles/roles.service';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  providers: [],
})
export class HomePageComponent {
  public role : string | null = null;

  constructor(private roleService: RolesService) {
    //Obtiene el rol con el cual se inicio sesión
    this.role = this.roleService.getRole();
  }
}
