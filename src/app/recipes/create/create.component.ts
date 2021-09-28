import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  selectedId: number = 0;
  selectedFile: File | any
  post = {
    title:'',
    description:'',
    image:""
  }

  constructor(private service: PostService,private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPostById(this.selectedId)
    console.log(this.selectedId)
  }

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]
  }

  handleUpload(event:any) {
     const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.post.image = reader.result as string
    };
}

  getPostById(id:number){
    if(!id){
      return;
    }
    this.service.getPostById(id).subscribe(res => {
      const {title, description} = res.json();
      console.log(res.json());
      this.post.title = title;
      this.post.description = description;
    })
  }

  onSubmit(){
    this.service.createPost(this.post).subscribe(resp => {
      console.log(resp);
      alert("Post has been Added");
      this.post = {
        title:'',
        description:'',
        image:''
      }
    })
  }

}
