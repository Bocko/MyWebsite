import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { PhotoEntry } from '../interfaces/photo-entry';
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
  planeSpottingEntries : PhotoEntry[] = [];
  otherEntries : PhotoEntry[] = [];

  planesGallery!: LightGallery;
  othersGallery!: LightGallery;
  settings = {
    download: false,
    counter: true,
    plugins: [lgZoom, lgHash, lgFullscreen]
  };

  constructor() 
  {
    this.photoHandler.getPlaneEntries().then((planeSpottingEntries: PhotoEntry[]) => 
      {
        this.planeSpottingEntries = planeSpottingEntries;
      });

    this.photoHandler.getOtherEntries().then((otherEntries: PhotoEntry[]) => 
      {
        this.otherEntries = otherEntries;
      });
  }

  onInitPlanes = (detail: InitDetail): void => {
    this.planesGallery = detail.instance;
    console.log("sima onInit");
    this.refreshGallery();
  };

  onInitOthers = (detail: InitDetail): void => {
    this.othersGallery = detail.instance;
    console.log("sima onInit");
    this.refreshGallery();
  };

  refreshGallery() 
  {
    if (this.planesGallery != undefined)
    {
      this.planesGallery.refresh();
    }
    
    if (this.othersGallery != undefined)
    {
      this.othersGallery.refresh();
    }
    console.log("refreshed");    
  }
}
