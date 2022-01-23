import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SnackbarGettingLikeComponent } from './snackbar-getting-like.component';

describe('SnackbarGettingLikeComponent', () => {
  let component: SnackbarGettingLikeComponent;
  let fixture: ComponentFixture<SnackbarGettingLikeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarGettingLikeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarGettingLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
