import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatImageListComponent } from './cat-image-list.component';

describe('CatImageListComponent', () => {
  let component: CatImageListComponent;
  let fixture: ComponentFixture<CatImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatImageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
