import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissoComponent } from './compromisso.component';

describe('CompromissoComponent', () => {
  let component: CompromissoComponent;
  let fixture: ComponentFixture<CompromissoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromissoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
