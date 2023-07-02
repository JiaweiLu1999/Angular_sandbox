import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UsersService} from "../users.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // @ts-ignore
  user: { id: number; name: string | undefined; };

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.user = {
      id: id,
      name: this.usersService.getUser(id)?.name
    };

    this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = this.usersService.getUser(params['id'])?.name;
      }
    )
  }


}
