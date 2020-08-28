import { Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormControl } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize} from 'rxjs/operators';
import { Router} from '@angular/router';
import { ImgService } from '../img.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{

  imgurl: any = 'assets/img/default.jpeg';
  selectedimg: any = null;
  isSubmitted = false;

  constructor(private storage: AngularFireStorage,private router: Router, private service: ImgService){}
  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.resetform();
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgurl = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedimg = event.target.files[0];
    }
    else{
      this.imgurl = 'assets/img/default.jpeg';
      this.selectedimg = null;
    }
  }

  onSubmit(formValue){
    this.isSubmitted = true;
    var path = `${this.selectedimg.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    var fileref = this.storage.ref(path);
    this.service.addIamge(this.selectedimg);
    this.storage.upload(path, this.selectedimg).snapshotChanges().pipe(
      finalize(()=>{
        fileref.getDownloadURL().subscribe((url)=>{
          formValue['imageUrl'] = url;
          this.service.addIamge(formValue);
          this.resetform();
          this.router.navigateByUrl('/images');
        })
      })
    ).subscribe();
    console.log(path);
  } 

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetform(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl:''
    });
    this.imgurl="assets/img/default.jpeg";
    this.isSubmitted=false;
    this.selectedimg=null;
  }
}
