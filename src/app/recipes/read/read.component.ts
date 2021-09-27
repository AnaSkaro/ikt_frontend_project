import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PostService } from 'src/app/services/api.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  posts:any;
  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  onDeletePost(id:number){
    this.service.onDeletePost(id).subscribe(res => {
      alert("Post has been deleted");
      this.getAllPosts()
    })
  }

  getAllPosts(){
    this.service.getPosts().subscribe(response => {
      this.posts = response.json();
    })
  }

}
