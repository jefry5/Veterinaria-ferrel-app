import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMascotaComponent } from './delete-mascota.component';

describe('DeleteMascotaComponent', () => {
  let component: DeleteMascotaComponent;
  let fixture: ComponentFixture<DeleteMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
