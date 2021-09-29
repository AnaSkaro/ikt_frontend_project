import { Component, OnInit } from '@angular/core';
import { timer, Observable, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';
import { PostService } from '../services/api.service';
import { GeolocationService } from '../services/geolocation.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subscription: Subscription
  posts: any;
  country:string;
  
  constructor(private geolocation:GeolocationService,private service: PostService, private localStorageService: LocalStorageService) {
  
  }
  
  ngOnInit(): void {
    if(navigator.onLine) {
      console.log("connection is active");
      this.geolocation.getCurrentLocation().subscribe(res =>{
        this.getAllPosts();
        this.country = res.json().country
      });
    } else {
      this.localStorageService.readAll().then(res => this.posts = res)
    }
    //Sync Service to get posts
    this.subscription = timer(0, 60000).pipe(switchMap(async() => this.getAllPosts())).subscribe(result => console.log(result))
  }
  //to get all posts from the server
  getAllPosts() {
    this.service.getPosts().subscribe(response => {
      let posts = response.json();
      this.posts = posts.filter((post: { country: string; }) => post.country == this.country);
      //storing posts into IndexDB
      this.localStorageService.add(this.posts);
    })
  }

  //to destroy sync service when components gets change
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
