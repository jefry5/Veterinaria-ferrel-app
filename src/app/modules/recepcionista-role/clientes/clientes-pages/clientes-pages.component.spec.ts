import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPagesComponent } from './clientes-pages.component';

describe('ClientesPagesComponent', () => {
  let component: ClientesPagesComponent;
  let fixture: ComponentFixture<ClientesPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
