import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/models/message';
import { MessageServise } from '../services/MessageServise';
import { Router } from '@angular/router';
import { CommonService } from '../services/commonService';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public form: FormGroup;
  public messageList: Message[]=this.messageService.messageList;

  private params: string;
  private subscriptionList: Subscription[] = [];

  constructor(private messageService: MessageServise,
    private formBilder:FormBuilder,
    private router:Router,
    private commonService: CommonService,
    ) { }

  ngOnInit(): void {
this.createForm();
  }

  public goBackClick(): void{
    this.router.navigate(['homePage']);

  }
public saveMessage(): void{
  const isValid=this.form.valid;
  const newMessage: Message=this.form.getRawValue();
  if(!isValid){
    this.commonService.showSnackBarMessage('You need to complet all field');
    return
  }
 this.addMessage(newMessage);
}

  private addMessage(newMessage: Message): void{
    this.messageService.addMessage(newMessage).subscribe(()=>{
      this.router.navigate(['homePage'])
    })
  }


  private createForm(): void{
    this.form=this.formBilder.group({
      name: [null],
      email: [null],
      text: [null],
    });
  }
}
