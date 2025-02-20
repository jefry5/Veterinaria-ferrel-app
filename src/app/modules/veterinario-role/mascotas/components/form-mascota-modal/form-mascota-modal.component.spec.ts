import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMascotaModalComponent } from './form-mascota-modal.component';

describe('FormMascotaModalComponent', () => {
  let component: FormMascotaModalComponent;
  let fixture: ComponentFixture<FormMascotaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMascotaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMascotaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
