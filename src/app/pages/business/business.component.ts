import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusinessService } from 'src/app/shared/services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements AfterViewInit {


  public data: Array<any> = [];
  public newData: any = {
    title: '',
    value: '',
    type: null
  };
  public displayedColumns: string[] = ['title', 'valueE', 'valueS', 'type'];
  public dataSource = new MatTableDataSource<any>();
  public loading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spinner: NgxSpinnerService, private _bottomSheet: MatBottomSheet, private showNotification: MatSnackBar, public dialog: MatDialog,
    private businessService: BusinessService
  ) {
    this.get();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get() {
    this.spinner.show();
    this.businessService.get().subscribe((res: any) => {
      this.data = res;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinner.hide();
      this.loading = false;
    }, error => {
      console.log(error)
      this.spinner.hide();
      this.loading = false;
    })
  }

  save() {
    this.spinner.show();
    this.data.push(this.newData);
    localStorage.setItem('data', JSON.stringify(this.data));
    this.initDate();
  }


  initDate() {
    this.newData = {
      title: '',
      value: '',
      type: null
    };
    this.setDataInTable();
    
  }

  /* FUÇÕES DA TABELA */

  setDataInTable() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.spinner.hide();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  installmentIsDue(element: any) {
    let index = element ? element.installments.findIndex((row: any) => !row.settled) : -1;
    return index >= 0 ? element.installments[index].date : '-';
  }

  getTotalAmount() {
    let amount = 0;
    this.dataSource.data.forEach((row: any) => amount += Number(row.amount));
    return amount;
  }

  getTotalAmountInstallments() {
    let amount = 0;
    this.dataSource.data.forEach((row: any) => amount += Number(row['installments'][0]['amount']));
    return amount;
  }

  getTotalRemaining() {
    let remaining = 0;
    this.dataSource.data.forEach((row: any) => remaining += !row.allSettled ? Number(row.remaining) : 0);
    return remaining;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'valueE':
          return this.compare(a.value, b.value, isAsc);
        case 'valueS':
          return this.compare(a.dueDate, b.dueDate, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}