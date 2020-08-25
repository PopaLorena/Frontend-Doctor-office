import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../models/patients';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonService } from '../services/commonService';
import { PatientService } from '../services/PatientService';
import { AppointmentService } from '../services/AppointmentService';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  selectedPatient: Patient;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    // 'CNP',
    // 'city',
    // 'country',
    // 'phoneNumber',
    'sex',
    'viewApp',
    'edit',
    'delete',
  ];
  public patientsList: Patient[];

firstname: string;
  dataSource = new MatTableDataSource<Patient>(this.patientsList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   patientList: Patient[] = this.patientService.patientList;

  constructor(
    private patientService: PatientService,
    private commonService: CommonService,
    private router: Router,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    if (!this.patientList) {
      this.getPatientList();
    }
  }

   applyFilter(filterValue: string){

  this.dataSource.filter=filterValue.trim().toLowerCase();
  
}
  // search(){
  //   if(this.firstname!=""){
  //   this.patientList=this.patientList.filter((res)=>{
  //     return res.firstName.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase());
  //   }); }
  //   else{
  //     this.ngOnInit();
  //   }
  // }

  newPatientClick(): void {
    this.selectedPatient = new Patient();
    this.router.navigate(['patient/new']);
    console.log("pwp");
  }

  deletePatient(id: number, index: number): void {
    this.patientService.deletePatient(id).subscribe(
      () => {
        this.commonService.showSnackBarMessage("patient deleted");
        this.patientsList.slice(index, 1);
        this.updateTable();
      }, (err)=>{
        this.commonService.showSnackBarMessage("delete fail");
      }
    );
    this.getPatientList();
  }

  updateTable(): void {
    this.dataSource = new MatTableDataSource<Patient>(this.patientsList);
    this.dataSource.paginator = this.paginator;

    // console.log("ccfnlsd")
  
  }

  getPatientList(): void {
    this.patientService.getPatients().subscribe((list: Patient[]) => {
      console.log(list)
      this.patientsList = list;
      this.updateTable();
    }, (err) => {
      if (err.status === 401) return;
      this.commonService.showSnackBarMessage('fail')
    });
    console.log("get")
  }

  editPatient(value: Patient): void {
    this.selectedPatient = value;
    this.router.navigate(['patient/edit/', this.selectedPatient.id]);

    console.log("edit");
  }

    savePatientFinished(value:Patient):void{
      if(value.id===0){
        this.patientsList.push(value);
        return;
      }
      const patientIndex=this.patientsList.findIndex(
        (patient)=> patient.id===value.id
      );
     if(patientIndex!== -1){
    this.patientsList[patientIndex]=value;
  }
  this.goBackClick();
    }

  goBackClick(): void {
    this.selectedPatient = undefined;
    this.router.navigate(['patients']);
    
  }

  viewApp(value: Patient): void{
   this.selectedPatient=value;
   this.router.navigate(['appointment/',this.selectedPatient.id]);
  }
}
