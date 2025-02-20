import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosPagesComponent } from './pagos-pages.component';

describe('PagosPagesComponent', () => {
  let component: PagosPagesComponent;
  let fixture: ComponentFixture<PagosPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
