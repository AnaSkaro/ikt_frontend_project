import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  selectedId: number = 0;
  selectedFile: File | any
  form: FormGroup;
  post = {
    id:0,
    title:'',
    description:'',
    image:""
  }

  constructor(private service: PostService,private route: ActivatedRoute, private localStorageService: LocalStorageService,private _formBuilder: FormBuilder) { 
    this.form = this._formBuilder.group(
      {
        id: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        image: ['', Validators.required],
      },
    );
   }

  ngOnInit(): void {
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPostById(this.selectedId)
    console.log(this.selectedId)
  }

  handleUpload(event:any) {
     const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.form.patchValue({
          'image':reader.result as string
        })
    };
}

  getPostById(id:number){
    if(!id){
      return;
    }
    this.service.getPostById(id).subscribe(res => {
      const {title, description,image} = res.json();
      console.log(res.json());
      this.form.patchValue({
        'id':id as number,
        'title':title,
        'description':description
      })
      this.post.id = id as number;
      this.post.title = title;
      this.post.description = description;
    })
  }

  onSubmit(){
    this.post = {...this.form.value};
    this.service.createPost(this.post).subscribe(resp => {
      if(this.post && this.post.id){
        this.localStorageService.delete(this.post.id)
      }
      console.log(resp);
      alert("Post has been Added");
      //clear the forms
      this.post = {
        id:0,
        title:'',
        description:'',
        image:''
      }
    })
  }
}
