import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'Firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  private imgpath ='/images'
  images: AngularFireList <any> = null;

  constructor(private firedb: AngularFireDatabase) {
    this.images = firedb.list(this.imgpath);
  }

  addIamge(image): void {
    this.images.push(image);
  }
  getImages(): AngularFireList<any>
{
  return this.images;
}

}
