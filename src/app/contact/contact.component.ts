import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/models/message';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MessageServise } from '../services/MessageServise';
import { CommonService } from '../services/commonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  private selctedMessage: Message;

  displayedColumns: string[] = [
    'name',
    'emal',
    'text',
    'delete',
  ];

  public messageList: Message[] = this.messageService.messageList;
  public dataSource = new MatTableDataSource<Message>(this.messageList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    private messageService: MessageServise,
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.messageList) {
this.getMessageList();
    }
  }
  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  public newMessageClick(): void {
    this.selctedMessage = new Message();
    this.router.navigate(['messages/new']);
  }
  public deleteMessage(id: number, index: number): void {
    this.messageService.deleteMessage(id).subscribe(() => {
      this.commonService.showSnackBarMessage("message deleted");
      this.messageList.slice(index, 1);
      this.updateTable();

    }, (err) => {
      this.commonService.showSnackBarMessage("felete fail");
    }
    );
    this.getMessageList();
  }

  private updateTable(): void {
    this.dataSource = new MatTableDataSource<Message>(this.messageList);
    this.dataSource.paginator = this.paginator;
  }
  private getMessageList(): void{
    this.messageService.getMessage().subscribe((list)=>{
      console.log(list);
      this.messageList=list;
      this.updateTable();
    },(err)=>{
      if(err.status===401)return;
      this.commonService.showSnackBarMessage('cant get the list');

    }
    );
    
  }
}
