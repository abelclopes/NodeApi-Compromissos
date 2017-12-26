import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCompromissoComponent } from './novo-compromisso.component';

describe('NovoCompromissoComponent', () => {
  let component: NovoCompromissoComponent;
  let fixture: ComponentFixture<NovoCompromissoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoCompromissoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCompromissoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
