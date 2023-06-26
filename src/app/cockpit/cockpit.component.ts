import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newServerContent = '';

  @Output() serverCreated = new EventEmitter<{name: string, content:string}>();
  @Output() blueprintCreated = new EventEmitter<{name: string, content:string}>();


  onAddServer(serverName: HTMLInputElement) {
    this.serverCreated.emit({
      name: serverName.value,
      content:this.newServerContent
    })
  }

  onAddBlueprint(serverName: HTMLInputElement) {
    this.blueprintCreated.emit({
      name: serverName.value,
      content:this.newServerContent
    })
  }

}
