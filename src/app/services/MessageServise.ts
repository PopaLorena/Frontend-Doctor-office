import { Injectable } from '@angular/core';
import {Message} from 'src/models/message'
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable()
export class MessageServise{
    public messageList: Message[];

    constructor(private httpClient: HttpClient){

    }

    getMessage():Observable<Message[]>{
        const url=``;
        return this.httpClient.get(url) as Observable<Message[]>;
    }
    addMessage(object: Message): Observable<Message>{
        const url=``;
        return this.httpClient.get(url) as Observable<Message>;
    }

    deleteMessage(id: number): Observable<null>{
        const url=``;
        return this.httpClient.get(url) as Observable<null>;
    }
}