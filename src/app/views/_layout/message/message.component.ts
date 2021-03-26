import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  showMessages = false;

  errors$: Observable<string[]>;

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.errors$ = this.messageService.errors$
      .pipe(
        tap(() => this.showMessages = true)
      );
  }

  /**
   * Hide messages
   */
  onClose() {
    this.showMessages = false;
  }

}
