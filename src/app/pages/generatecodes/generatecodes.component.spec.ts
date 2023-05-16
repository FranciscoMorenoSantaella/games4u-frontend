import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratecodesComponent } from './generatecodes.component';

describe('GeneratecodesComponent', () => {
  let component: GeneratecodesComponent;
  let fixture: ComponentFixture<GeneratecodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratecodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratecodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
