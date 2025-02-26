import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHistoriaModalComponent } from './details-historia-modal.component';

describe('DetailsHistoriaModalComponent', () => {
  let component: DetailsHistoriaModalComponent;
  let fixture: ComponentFixture<DetailsHistoriaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHistoriaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsHistoriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
