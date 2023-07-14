import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostEntity} from "./post.entity";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) {

  }

  postEntity(postData: PostEntity) {
    return this.httpClient
      .post<{[name: string]: string}>("https://angular-sandbox-57e33-default-rtdb.firebaseio.com/data.json", postData);
  }

  getResponseObs() {
    return this.httpClient.get<{[key: string]: PostEntity}>("https://angular-sandbox-57e33-default-rtdb.firebaseio.com/data.json")
      .pipe(map((response) => {
          const arr: PostEntity[] = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              arr.push({"id": key, ...response[key]})
            }
          }
          return arr;
        }
      ));
  }

  deleteResponse() {
    return this.httpClient.delete("https://angular-sandbox-57e33-default-rtdb.firebaseio.com/data.json");
  }
}
