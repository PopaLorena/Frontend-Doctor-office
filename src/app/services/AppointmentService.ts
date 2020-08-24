import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../../models/appointment';


@Injectable()


export class AppointmentService {

    public appointmentList: Appointment[];

    constructor(private httpClient: HttpClient,
    ) { }

    getAppointment(): Observable<Appointment[]> {
        const url = `http://localhost:8888/appointment`;
        return this.httpClient.get(url) as Observable<Appointment[]>;
    }
    getAppointmentByPatientId(id: number): Observable<Appointment[]> {
        const url = `http://localhost:8888/appointment/${id}`;
        return this.httpClient.get(url) as Observable<Appointment[]>;
    }
    addAppointment(object: Appointment): Observable<Appointment> {
        const url = `http://localhost:8888/appointment/create`;
        return this.httpClient.post(url, object) as Observable<Appointment>;
    }

    editAppointment(object: Appointment): Observable<Appointment> {
        const url = `http://localhost:8888/appointment/edit`;
        return this.httpClient.put(url, object) as Observable<Appointment>;
    }

    deleteAppointment(id: number): Observable<null> {
        const url = `http://localhost:8888/appointment/${id}/delete`;
        return this.httpClient.delete(url) as Observable<null>;
    }
}