import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/models/patients';



@Injectable()
export class PatientService {
  public patientList: Patient[];
 
  constructor(private httpClient: HttpClient,
    ) {}

  getPatients(): Observable<Patient[]> {
    const url = `http://localhost:8888/patient`;
  
    return this.httpClient.get(url) as Observable<Patient[]>;
  }

  addPatient(object: Patient): Observable<Patient> {
    const url = `http://localhost:8888/patient/create`;
    return this.httpClient.post(url, object) as Observable<Patient>;
  }

  updatePatient(object: Patient): Observable<Patient> {
    const url = `http://localhost:8888/patient/edit`;
    return this.httpClient.put(url, object) as Observable<Patient>;
  }
  deletePatient(id: number): Observable<null> {
    const url = `http://localhost:8888/patient/${id}/delete`;
    
    return this.httpClient.delete(url) as Observable<null>;
  }
}