import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompromissosComponent } from './compromissos.component';

describe('CompromissosComponent', () => {
  let component: CompromissosComponent;
  let fixture: ComponentFixture<CompromissosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompromissosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompromissosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
