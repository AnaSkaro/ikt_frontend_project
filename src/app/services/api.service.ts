import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://localhost:3000/posts";

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get(this.url);
  }
  
  getPostById(id:number){
    return this.http.get(this.url+"/"+id);
  }

  createPost(post:any){
    return this.http.post(this.url,post);
  }
 updatePost(post:any){
    return this.http.put(this.url + '/'+ post.id,post);
  }

  onDeletePost(id:number){
    return this.http.delete(this.url + '/'+ id);
  }
}