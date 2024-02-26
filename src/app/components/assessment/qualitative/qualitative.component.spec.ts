import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitativeComponent } from './qualitative.component';

describe('QualitativeComponent', () => {
  let component: QualitativeComponent;
  let fixture: ComponentFixture<QualitativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualitativeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualitativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
