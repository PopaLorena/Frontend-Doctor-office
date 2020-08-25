import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Patient, Sex } from 'src/models/patients';
import { PatientService } from '../services/PatientService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../services/commonService';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import * as _moment from 'moment';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit, OnDestroy {
  sex: string[] = Object.values(Sex);
  params: string;
  form: FormGroup;
  subscriptionList: Subscription[] = [];
  public patientList: Patient[] = this.patientService.patientList;
  private patientToEdit: Patient = new Patient();
  

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,) { }
 

  ngOnInit(): void {
    this.createForm();
    this.subscriptionList.push(
      this.activatedRoute.params.subscribe((param) => {
        if (param.id && parseInt(param.id, 10)) {
          this.setEditPatient(parseInt(param.id, 10));
        }
      })
    )
    // if(this.params!=='new'){
    //   this.patientService.getPatients().subscribe(list=>{
    //     const patient=list.find(p=>p.id.toString()=== this.params);
    //     this.patientToEdit=patient ? patient : new Patient();
    //     this.form.patchValue(this.patientToEdit,{
    //       emitEvent:false,
    //     });
    //   });


    // }
    if (!this.patientList) {
      this.getPatientList
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  
  private addPatient(newPatient: Patient): void {
    this.patientService.addPatient(newPatient).subscribe(() => {
      this.router.navigate(['patients'])
    });
  }
  private updatePatient(newPatient: Patient): void {
    this.patientService.updatePatient(newPatient).subscribe(() => {
      this.router.navigate(['patients'])
    });
  }
  goBackClick(): void {
    this.router.navigate(['patients']);
  }
  saveNewPatient(): void {
    const isValid = this.form.valid;
    const newPatient: Patient = {
      ...this.patientToEdit,
      ...this.form.getRawValue(),
    };
    if (!isValid) {
      this.commonService.showSnackBarMessage('invalid patient');
      return;
    }
    newPatient.id > 0 ? this.updatePatient(newPatient) : this.addPatient(newPatient);
  }

  private setEditPatient(id: number): void {
    this.patientService.getPatients().subscribe((list) => {
      this.patientToEdit = list.find((pat) => pat.id === id);
      this.form.patchValue(this.patientToEdit, {
        emitEvent: false
      });
      console.log(this.patientToEdit)
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      birthDate: [null],
      cnp: [null],
      city: [null],
      country: [null],
      phoneNumber: [null],
      sex:[Sex.MALE],
    });
  }

  private getPatientList(): void {
    this.patientService.getPatients().subscribe((list: Patient[]) => {
      this.patientList = list;
      this.patientService.patientList = list;
    });
  }
}
