import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversionComponent } from './reversion.component';

describe('ReversionComponent', () => {
  let component: ReversionComponent;
  let fixture: ComponentFixture<ReversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReversionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
