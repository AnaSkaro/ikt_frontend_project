import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  posts:any;
  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  getAllPosts(){
    this.service.getPosts().subscribe(response => {
      this.posts = response.json();
    })
  }
}
