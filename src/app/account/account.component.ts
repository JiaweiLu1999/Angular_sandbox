import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LoggingService} from "../logging.service";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LoggingService]
})
export class AccountComponent {
  // @ts-ignore
  @Input() account: {name: string, status: string};
  // @ts-ignore
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accountService: AccountService) {
  }


  onSetTo(status: string) {
    this.accountService.changeStatus(this.id, status);
    this.loggingService.logStatusChange(status);
  }
}
