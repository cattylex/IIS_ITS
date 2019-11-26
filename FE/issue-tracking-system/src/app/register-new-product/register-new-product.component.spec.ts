import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewProductComponent } from './register-new-product.component';

describe('RegisterNewProductComponent', () => {
  let component: RegisterNewProductComponent;
  let fixture: ComponentFixture<RegisterNewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
