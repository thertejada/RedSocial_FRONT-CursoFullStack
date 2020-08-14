import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFullComponent } from './info-full.component';

describe('InfoFullComponent', () => {
  let component: InfoFullComponent;
  let fixture: ComponentFixture<InfoFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
