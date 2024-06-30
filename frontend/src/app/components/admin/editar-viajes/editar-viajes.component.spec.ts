import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarViajesComponent } from './editar-viajes.component';

describe('EditarViajesComponent', () => {
  let component: EditarViajesComponent;
  let fixture: ComponentFixture<EditarViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarViajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
