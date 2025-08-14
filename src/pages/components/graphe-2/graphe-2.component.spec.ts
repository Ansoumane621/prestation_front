import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graphe2Component } from './graphe-2.component';

describe('Graphe2Component', () => {
  let component: Graphe2Component;
  let fixture: ComponentFixture<Graphe2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graphe2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Graphe2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
