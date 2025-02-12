import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductoModalComponent } from './agregar-producto-modal.component';

describe('AgregarProductoModalComponent', () => {
  let component: AgregarProductoModalComponent;
  let fixture: ComponentFixture<AgregarProductoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProductoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
