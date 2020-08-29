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
  loading = true;
  loaded = false;

  async ngOnInit() {
    try{
    await this.getImageList();
    }
    catch (err){
      console.log(err);
    }
  }

  getImageList() {
    this.service.getImages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(images => {
      this.loading = false;
      this.loaded = true;
      this.images = images.reverse();
    });
    console.log(this.images);

  }

}