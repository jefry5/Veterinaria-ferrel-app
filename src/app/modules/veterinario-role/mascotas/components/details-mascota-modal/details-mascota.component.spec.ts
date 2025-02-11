import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMascotaComponent } from './details-mascota.component';

describe('DetailsMascotaComponent', () => {
  let component: DetailsMascotaComponent;
  let fixture: ComponentFixture<DetailsMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
