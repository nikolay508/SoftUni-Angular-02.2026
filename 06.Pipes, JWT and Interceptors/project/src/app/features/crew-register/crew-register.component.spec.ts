import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewRegisterComponent } from './crew-register.component';

describe('CrewRegisterComponent', () => {
  let component: CrewRegisterComponent;
  let fixture: ComponentFixture<CrewRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
