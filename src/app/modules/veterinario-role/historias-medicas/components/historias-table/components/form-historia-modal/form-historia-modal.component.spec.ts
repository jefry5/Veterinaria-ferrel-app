import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHistoriaModalComponent } from './form-historia-modal.component';

describe('FormHistoriaModalComponent', () => {
  let component: FormHistoriaModalComponent;
  let fixture: ComponentFixture<FormHistoriaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHistoriaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormHistoriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
