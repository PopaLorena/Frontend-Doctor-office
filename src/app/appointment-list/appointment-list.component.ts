import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment, AppointmentStatus } from 'src/models/appointment';
import { Subscription } from 'rxjs';
import { Patient } from 'src/models/patients';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonService } from '../services/commonService';
import { AppointmentService } from '../services/AppointmentService';
import { PatientService } from '../services/PatientService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  selectedAppointment: Appointment;

  subscriptionList: Subscription[] = [];


  displayesColumns: string[] = [
    'startTime',
    'endTime',
    'description',
    'appointmentType',
    'appointmentStatus',
    // 'patient',
    'edit',
    'cancel',

  ];
  private AppointmentToEdit: Appointment = new Appointment();
  appointmentList: Appointment[]= this.appointmentService.appointmentList;
  patientList: Patient[];
   params: number;
  dataSource = new MatTableDataSource<Appointment>(this.appointmentList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  private patientToShow: Patient;
  constructor(
    private commonService: CommonService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
  ) { }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {

        if (!!parseInt(param?.patientId, 10)) {
          this.setViewAppointment(parseInt(param.patientId, 10));
          console.log("pwp21")
          this.params=param.patientId;
        }

        console.log("pwp31")
      })
    )
    
  };

  ngOnDestroy(): void {
    // this.firstNameSubscription.unsubscribe();
    this.subscriptionList.forEach((sub) => sub.unsubscribe());
  }

  goBackClick():void {
    this.router.navigate(['patients']);
  }
  newAppointmentClick( ): void {
    this.selectedAppointment = new Appointment();
    this.router.navigate(['appointment/new',this.params]);

  }
  editAppointment(value: Appointment): void {
    this.selectedAppointment = value;
    this.router.navigate(['appoitment/edit/', this.selectedAppointment.id]);
  }
  updateTable(): void {
    this.dataSource = new MatTableDataSource<Appointment>(this.appointmentList);
    this.dataSource.paginator = this.paginator;
  }

  public cancelAppointment(id: number): void {
    
    this.appointmentService.getAppointment().subscribe((list) => {
      this.selectedAppointment = list.find((pat) => pat.id === id);
    this.selectedAppointment.status = AppointmentStatus.CANCELED;
  }
  );
  this.appointmentService.editAppointment(this.selectedAppointment).subscribe(()=>{
    this.updateTable();
  });
  
}

  setViewAppointment(id: number): void {
    this.patientService.getPatients().subscribe((list) => {
      this.patientToShow = list.find((patient) => patient.id === id);
      // this.tableTitle = `${this.patientToShow.firstName}'s appointments:`;
      this.appointmentService.getAppointmentByPatientId(this.patientToShow.id).subscribe((list: Appointment[]) => {
        this.appointmentList = list;
        this.updateTable();
      });
    });
  }

  //    getAppointmentList(patientId: number):void{
  //   this.appointmentService.getAppointmentByPatientId(patientId).subscribe((list: Appointment[])=>{
  //     this.appointmentList=list;
  //     this.updateTable();
  //   },(err)=>{
  //     if(err.status===401) return;
  //     this.commonService.showSnackBarMessage('fail')
  //   }

  //   );
  // }


}
