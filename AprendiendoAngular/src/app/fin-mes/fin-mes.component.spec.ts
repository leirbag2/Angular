import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinMesComponent } from './fin-mes.component';

describe('FinMesComponent', () => {
  let component: FinMesComponent;
  let fixture: ComponentFixture<FinMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
