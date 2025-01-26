import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightgalleryComponent, LightgalleryModule } from 'lightgallery/angular';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { PhotoListEntry } from '../interfaces/photo-entry';
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
  filteredGalleryLists :  PhotoListEntry[] = [];

  galleries: LightGallery[] = [];
  gallerySettings: LightgalleryComponent["settings"][] = [];
  othersGallery!: LightGallery;

  detailsStates: Map<string, boolean> = new Map<string, boolean>;

  constructor()
  {
    this.photoHandler.getImageLists().then((galleryLists: PhotoListEntry[]) => 
    {
      this.galleryLists = galleryLists;
      this.createGallerySettings();
      this.filteredGalleryLists = JSON.parse(JSON.stringify(this.galleryLists));

      for (let index = 0; index < galleryLists.length; index++)
      {
        const element = galleryLists[index];
        this.detailsStates.set(element.name,false);
      }
    });
  }

  createGallerySettings()
  {
    for (let i = 0; i < this.galleryLists.length; i++) {
      const settings : LightgalleryComponent["settings"] = 
      {
        galleryId: this.galleryLists[i].name,
        download: false,
        counter: true,
        infiniteZoom: true,
        actualSize: false,
        showZoomInOutIcons: true,
        customSlideName: true,
        plugins: [lgZoom, lgHash, lgFullscreen]
      };
      
      this.gallerySettings.push(settings);
    }
  }

  onGalleryInit = (detail: InitDetail): void => {
    detail.instance.settings.galleryId = this.galleries.length.toString();
    detail.instance.refresh();
    this.galleries.push(detail.instance);

    let numberOfGalleries = 0;

    this.filteredGalleryLists.forEach(element =>
    {
      if (element.items.length > 0)
      {
        numberOfGalleries++;
      }
    });

    if (this.galleries.length == numberOfGalleries)
    {
      this.applyDetailsStates();
    }
  };

  refreshGalleries() 
  {
    this.galleries.forEach(gallery => 
    {
      gallery.refresh();
    });
  }

  updateDetailsStates()
  {
    this.detailsStates.forEach((isOpen, id, _) =>
    {
      const element = document.getElementById(id);
      if (element != null)
      {
        this.detailsStates.set(id, element!.hasAttribute("open"));
      }
    });
  }

  applyDetailsStates()
  {
    this.detailsStates.forEach((isOpen, id, _) =>
    {
      if (isOpen)
      {
        document.getElementById(id)?.setAttribute("open", "true");
      }
    });
  }

  filterGalleries(text: string)
  {
    this.updateDetailsStates();
    this.galleries = [];
    this.filteredGalleryLists = JSON.parse(JSON.stringify(this.galleryLists));

    if (text)
    {
      for (let i : number = 0; i < this.filteredGalleryLists.length; i++)
        {
          this.filteredGalleryLists[i].items = this.filteredGalleryLists[i].items.filter((photoEntry) =>
            photoEntry.name.toLowerCase().includes(text.toLowerCase()),
          );
        }
    }

    this.refreshGalleries();
  }
}
