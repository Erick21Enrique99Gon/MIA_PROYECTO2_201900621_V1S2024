import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRecepcionistasComponent } from './editar-recepcionistas.component';

describe('EditarRecepcionistasComponent', () => {
  let component: EditarRecepcionistasComponent;
  let fixture: ComponentFixture<EditarRecepcionistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRecepcionistasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRecepcionistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
