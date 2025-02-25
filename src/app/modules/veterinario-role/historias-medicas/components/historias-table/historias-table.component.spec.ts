import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriasTableComponent } from './historias-table.component';

describe('HistoriasTableComponent', () => {
  let component: HistoriasTableComponent;
  let fixture: ComponentFixture<HistoriasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriasTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
