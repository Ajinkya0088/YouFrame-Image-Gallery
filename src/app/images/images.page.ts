import { Component, OnInit } from '@angular/core';
import { ImgService } from '../img.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {

  constructor(private service: ImgService) { }
  images: any;
  imageList: any[];
  i: any;
  ngOnInit() {
    this.getImageList();
  }

  getImageList() {
    this.service.getImages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(images => {
      this.images = images.reverse();
    });
    console.log(this.images);

  }

}