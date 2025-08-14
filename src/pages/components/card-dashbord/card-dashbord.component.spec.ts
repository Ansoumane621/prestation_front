import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDashbordComponent } from './card-dashbord.component';

describe('CardDashbordComponent', () => {
  let component: CardDashbordComponent;
  let fixture: ComponentFixture<CardDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
