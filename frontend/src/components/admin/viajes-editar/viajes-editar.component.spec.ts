import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajesEditarComponent } from './viajes-editar.component';

describe('ViajesEditarComponent', () => {
  let component: ViajesEditarComponent;
  let fixture: ComponentFixture<ViajesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajesEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViajesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
