import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPageComponent } from './orden-page.component';

describe('OrdenPageComponent', () => {
  let component: OrdenPageComponent;
  let fixture: ComponentFixture<OrdenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
