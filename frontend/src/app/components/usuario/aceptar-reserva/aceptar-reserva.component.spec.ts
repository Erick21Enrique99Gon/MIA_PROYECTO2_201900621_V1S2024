import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarReservaComponent } from './aceptar-reserva.component';

describe('AceptarReservaComponent', () => {
  let component: AceptarReservaComponent;
  let fixture: ComponentFixture<AceptarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptarReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
