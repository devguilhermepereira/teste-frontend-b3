import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { BusinessService } from 'src/app/shared/services/business.service';
import { BusinessComponent } from './business.component';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;
  let businessServiceMock: any;
  let spinnerMock: any;

  beforeEach(async () => {
    businessServiceMock = {
      get: jest.fn().mockReturnValue(of([{ title: 'Test', value: 100, type: 'Type1' }])),
    };

    spinnerMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [BusinessComponent],
      // providers: [
      //   { provide: BusinessService, useValue: businessServiceMock },
      //   { provide: NgxSpinnerService, useValue: spinnerMock },
      //   { provide: MatBottomSheet, useValue: {} },
      //   { provide: MatSnackBar, useValue: {} },
      //   { provide: MatDialog, useValue: {} },
      // ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    component.paginator = { firstPage: jest.fn() } as unknown as MatPaginator;
    component.sort = {} as MatSort;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call get method and set data correctly', () => {
    component.get();
    expect(spinnerMock.show).toHaveBeenCalled();
    expect(businessServiceMock.get).toHaveBeenCalled();
    expect(component.data.length).toBe(1);
    expect(component.dataSource.data.length).toBe(1);
    expect(spinnerMock.hide).toHaveBeenCalled();
  });

  it('should call save method and update data', () => {
    component.newData = { title: 'New Title', value: 200, type: 'Type2' };
    component.save();
    expect(component.data.length).toBe(2);
    expect(localStorage.getItem('data')).toContain('New Title');
  });

  it('should apply filter to the dataSource', () => {
    const event = { target: { value: 'test' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('test');
  });

  it('should calculate total amount correctly', () => {
    component.dataSource = new MatTableDataSource([{ amount: 100 }, { amount: 200 }]);
    const totalAmount = component.getTotalAmount();
    expect(totalAmount).toBe(300);
  });

  it('should calculate total remaining correctly', () => {
    component.dataSource = new MatTableDataSource([{ remaining: 50, allSettled: false }, { remaining: 0, allSettled: true }]);
    const totalRemaining = component.getTotalRemaining();
    expect(totalRemaining).toBe(50);
  });

  it('should sort data correctly', () => {
    component.dataSource = new MatTableDataSource([
      { title: 'B', value: 200, type: 'Type2' },
      { title: 'A', value: 100, type: 'Type1' },
    ]);
    component.sortData({ active: 'title', direction: 'asc' });
    expect(component.dataSource.data[0].title).toBe('A');
  });
});