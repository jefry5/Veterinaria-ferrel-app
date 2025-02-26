import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasTableComponent } from './mascotas-table.component';

describe('MascotasTableComponent', () => {
  let component: MascotasTableComponent;
  let fixture: ComponentFixture<MascotasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
