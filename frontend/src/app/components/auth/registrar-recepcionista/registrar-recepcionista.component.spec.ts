import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRecepcionistaComponent } from './registrar-recepcionista.component';

describe('RegistrarRecepcionistaComponent', () => {
  let component: RegistrarRecepcionistaComponent;
  let fixture: ComponentFixture<RegistrarRecepcionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarRecepcionistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
