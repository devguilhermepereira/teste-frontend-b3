import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BusinessService } from 'src/app/shared/services/business.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let businessServiceMock: any;

  beforeEach(async () => {
    businessServiceMock = {
      getDolar: jest.fn().mockReturnValue(of({ USDBRL: { bid: '5.25', ask: '5.30' } })),
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: BusinessService, useValue: businessServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDolar and set data correctly', () => {
    component.ngOnInit();
    expect(businessServiceMock.getDolar).toHaveBeenCalled();
    expect(component.data).toEqual({ bid: '5.25', ask: '5.30' });
  });

  it('should log data to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalledWith({ bid: '5.25', ask: '5.30' });
  });
});