import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadgameComponent } from './uploadgame.component';

describe('UploadgameComponent', () => {
  let component: UploadgameComponent;
  let fixture: ComponentFixture<UploadgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadgameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
