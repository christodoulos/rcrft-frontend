import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitativeReferenceComponent } from './quantitative-reference.component';

describe('QuantitativeReferenceComponent', () => {
  let component: QuantitativeReferenceComponent;
  let fixture: ComponentFixture<QuantitativeReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantitativeReferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuantitativeReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
