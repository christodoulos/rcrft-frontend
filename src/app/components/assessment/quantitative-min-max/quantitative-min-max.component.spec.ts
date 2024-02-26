import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeMinMaxComponent } from './quantitative-min-max.component';

describe('QuantitativeMinMaxComponent', () => {
  let component: QuantitativeMinMaxComponent;
  let fixture: ComponentFixture<QuantitativeMinMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeMinMaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantitativeMinMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
