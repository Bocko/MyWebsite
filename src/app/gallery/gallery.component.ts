import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { PhotoEntry, PhotoListEntry } from '../interfaces/photo-entry';
import lgZoom from 'lightgallery/plugins/zoom';
import lgHash from 'lightgallery/plugins/hash';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import { InitDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';

@Component({
  selector: 'mw-gallery',
  standalone: true,
  imports: [ LightgalleryModule, CommonModule ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  photoHandler: PhotoHandlerService = inject(PhotoHandlerService);
  galleryLists : PhotoListEntry[] = [];

  galleries: LightGallery[] = [];
  othersGallery!: LightGallery;
  settings = {
    download: false,
    counter: true,
    plugins: [lgZoom, lgHash, lgFullscreen]
  };

  constructor() 
  {
    this.photoHandler.getImageLists().then((galleryLists: PhotoListEntry[]) => 
    {
      this.galleryLists = galleryLists;
    });
  }

  onGalleryInit = (detail: InitDetail): void => {
    console.log("onInit: " + detail.instance);
    detail.instance.refresh();
    this.galleries.push(detail.instance);
  };

  refreshGalleries() 
  {
    this.galleries.forEach(gallery => 
    {
      gallery.refresh();
    });
  }
}
