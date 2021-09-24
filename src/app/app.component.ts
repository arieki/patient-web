import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from './core/services/patient.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  patient: any;
  isCreateNew = true;

  displayedColumns: string[] = ['action', 'id', 'firstName', 'lastName', 'email', 'phone', 'address'];
  dataSource: any;

  currPage = 0;
  length = 0;
  pageSize = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern('\d')]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private patientService: PatientService,
  ) {
    this.patient = {};
  }

  ngOnInit(): void {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 5;
    this.getPatientByPage(pageEvent);
  }

  refreshInquiry() {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 5;
    this.getPatientByPage(pageEvent);
    this.resetForm();
  }


  getPatientByPage(event: PageEvent){
    console.log(event);
    this.patientService.findNextData(event.pageIndex, event.pageSize).subscribe(resp => {
      this.length = resp.content.length;
      this.dataSource = new MatTableDataSource<PeriodicElement>(resp.content);
    })
  }

  savePatient() {
    console.log(this.patient);
    this.patient.createdDate = formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en');
    this.patientService.save(this.patient).subscribe(resp => {
      this.refreshInquiry();
    });
  }

  updatePatient() {
    this.patient.updatedDate = formatDate(new Date(), 'dd/MM/yyyy HH:mm:ss', 'en');
    this.patientService.update(this.patient.id, this.patient).subscribe(resp => {
      this.refreshInquiry();
    })
  }

  selectPatient(selectedData: any) {
    this.patient = selectedData;
    this.isCreateNew = false;
  }

  deletePatient(data: any) {
    this.patientService.delete(data.id).subscribe(resp => {
      this.refreshInquiry();
    })
  }


  resetForm() {
    this.patient = {};
    this.isCreateNew = true;
  }

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
}
