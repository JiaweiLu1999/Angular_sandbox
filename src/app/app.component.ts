import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {PostEntity} from "./post.entity";
import {Observable, pipe} from "rxjs";
import {PostService} from "./post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostEntity[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: PostEntity) {
    // Send Http request
    this.postService.postEntity(postData)
      .subscribe(responseData => {
        this.onFetchPosts();
      });
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading = true;
    this.postService.getResponseObs().subscribe(
      responseData => {
        this.isLoading = false;
        this.loadedPosts = responseData;
      }
    , error => {
        this.error = error.message;
      });

  }

  onClearPosts() {
    // Send Http request
    this.postService.deleteResponse().subscribe(response=> {
      this.onFetchPosts();
    })
  }


}
