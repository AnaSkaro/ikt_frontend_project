import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PostService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  posts:any;
  constructor(private service: PostService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getAllPosts()
  }

  //delete post by id
  onDeletePost(id:number){
    if(navigator.onLine){
      this.service.onDeletePost(id).subscribe(res => {
        this.localStorageService.delete(id) // deleting post from indexDB
        alert("Post has been deleted");
        this.getAllPosts()
      },error => {
        console.log(error);
      })
    }else{
      alert("There is something wrong with your internet conenction");
    }
  }

  getAllPosts(){
    this.service.getPosts().subscribe(response => {
      this.posts = response.json();
    })
  }

}
