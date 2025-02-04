import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriasMedicasPageComponent } from './historias-medicas-page.component';

describe('HistoriasMedicasPageComponent', () => {
  let component: HistoriasMedicasPageComponent;
  let fixture: ComponentFixture<HistoriasMedicasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriasMedicasPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriasMedicasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
