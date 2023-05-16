import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbalanceComponent } from './addbalance.component';

describe('AddbalanceComponent', () => {
  let component: AddbalanceComponent;
  let fixture: ComponentFixture<AddbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
