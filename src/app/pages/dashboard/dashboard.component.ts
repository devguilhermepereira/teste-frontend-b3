import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/shared/services/business.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any = {};

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
    this.businessService.getDolar().subscribe((res: any) => {
      if (res && res.USDBRL) this.data = res.USDBRL;
      console.log(this.data);
      
    })
  }

}
