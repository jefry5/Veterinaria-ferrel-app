import { Component } from '@angular/core';
import { LoadingPageComponent } from "../../../shared/components/loading-page/loading-page.component";

@Component({
  selector: 'app-auth-page',
  imports: [LoadingPageComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  onSignIn(): void {
    
  }
}
