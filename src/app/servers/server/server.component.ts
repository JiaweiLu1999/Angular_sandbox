import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Data, Params, Router} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  // @ts-ignore
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // // @ts-ignore
    // this.server = this.serversService.getServer(
    //   +this.route.snapshot.params['id']
    // );
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     // @ts-ignore
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // )
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    )
  }

  onEdit() {
    this.router.navigate(["edit"], {relativeTo: this.route, queryParamsHandling: "preserve"});
  }

}