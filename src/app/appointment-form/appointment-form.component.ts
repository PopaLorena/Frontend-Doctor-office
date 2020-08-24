import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Appointment, AppointmentType, AppointmentStatus } from 'src/models/appointment';
import { AppointmentService } from '../services/AppointmentService';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/commonService';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  type: string[] = Object.values(AppointmentType);
  params: string;
  form: FormGroup;
  subscriptionList: Subscription[] = [];
  public appointmentList: Appointment[] = this.appointmentService.appointmentList;
  private AppointmentToEdit: Appointment = new Appointment();
  patientId: number;
  constructor(
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {

    
    this.subscriptionList.push(
      this.activateRouter.params.subscribe((param)=>{
        if (param.id && parseInt(param.id, 10)) {
          this.setEditApp(parseInt(param.id, 10));
          this.patientId=param.patientId;
        }

      })
    )
    this.createForm(this.patientId);
  }

  private setEditApp(id: number): void {
    this.appointmentService.getAppointment().subscribe((list) => {
      this.AppointmentToEdit = list.find((pat) => pat.id === id);
      this.form.patchValue(this.AppointmentToEdit, {
        emitEvent: false
      });
    }
    );
  }

  goBack(): void {
    this.router.navigate(['appointment/:patientId']);
  }

  saveNewAppointment(): void {
    const isValid = this.form.valid;
    const newApp: Appointment = {
      ...this.AppointmentToEdit,
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      this.commonService.showSnackBarMessage('invalid appointment');
      return
    }
    newApp.id > 0 ? this.updateAppointment(newApp) : this.addAppointment(newApp);
    this.router.navigate([])
  }

  private addAppointment(newApp: Appointment):void{
    this.appointmentService.addAppointment(newApp).subscribe(()=>{
      this.router.navigate(['appointment/'])
    });
  }

private updateAppointment(newApp: Appointment): void{
  this.appointmentService.editAppointment(newApp).subscribe(()=>{
    this.router.navigate(['appointment/', this.AppointmentToEdit.patientId])
  })
}

  private createForm(id:number): void {
    this.form = this.formBuilder.group({
      startTime: [null],
      endTime: [null],
      description: [null],
      type: [AppointmentType.REGULAR],
      status: [AppointmentStatus.CREATED],
      patientId:[id]
    })
  }
}
