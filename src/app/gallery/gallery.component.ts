import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LightgalleryComponent, LightgalleryModule } from 'lightgallery/angular';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { getSelectedFilterField, PhotoListEntry, PhotoMetadata } from '../interfaces/photo-entry';
import lgZoom from 'lightgallery/plugins/zoom';
import lgHash from 'lightgallery/plugins/hash';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import { InitDetail } from 'lightgallery/lg-events';
import { LightGallery } from 'lightgallery/lightgallery';
import { EnumToArrayPipe } from '../services/pipes';

@Component({
  selector: 'mw-gallery',
  standalone: true,
  imports: [ LightgalleryModule, CommonModule, EnumToArrayPipe, FormsModule ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent
{
  photoHandler: PhotoHandlerService = inject(PhotoHandlerService);
  PhotoMetadata = PhotoMetadata

  galleryLists : PhotoListEntry[] = [];
  filteredGalleryLists :  PhotoListEntry[] = [];

  galleries: LightGallery[] = [];
  gallerySettings: LightgalleryComponent["settings"][] = [];
  othersGallery!: LightGallery;

  detailsStates: Map<string, boolean> = new Map<string, boolean>;

  selectedFieldFilter: string = PhotoMetadata.NAME;
  selectedFieldSort: string = PhotoMetadata.DATE;
  isSortingReversed: boolean = true;

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
        this.detailsStates.set(element.name, false);
      }
    });
  }

//#region Gallery Methods

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

//#endregion Gallery Methods

//#region Gallery Open/Close State Handlers

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

//#endregion Gallery Open/Close State Handlers

//#region Filtering

  filterGalleries(text: string)
  {
    this.updateDetailsStates();
    this.galleries = [];
    this.filteredGalleryLists = JSON.parse(JSON.stringify(this.galleryLists));

    if (text && this.selectedFieldFilter)
    {
      for (let i : number = 0; i < this.filteredGalleryLists.length; i++)
      {
        this.filteredGalleryLists[i].items = this.filteredGalleryLists[i].items.filter((photoEntry) =>
          getSelectedFilterField(this.selectedFieldFilter, photoEntry).toLowerCase().includes(text.toLowerCase())
        );
      }
    }

    this.sortGalleries();
  }

  clearGalleriesFilter()
  {
    (document.getElementById("filterInput") as HTMLInputElement).value = "";
    this.filterGalleries("");
  }

//#endregion Filtering

//#region Sorting

  sortGalleries()
  {
    this.updateDetailsStates();
    this.galleries = [];
    this.filteredGalleryLists = JSON.parse(JSON.stringify(this.filteredGalleryLists));

    const selectedSort = this.selectedFieldSort;

    for (let i : number = 0; i < this.filteredGalleryLists.length; i++)
    {
      this.filteredGalleryLists[i].items = this.filteredGalleryLists[i].items.sort((photoA, photoB) =>
      {
        if (this.isSortingReversed)
        {
          return getSelectedFilterField(selectedSort, photoB).localeCompare(getSelectedFilterField(selectedSort, photoA))
        }
        else
        {
          return getSelectedFilterField(selectedSort, photoA).localeCompare(getSelectedFilterField(selectedSort, photoB))
        }
      });
    }

    this.refreshGalleries();
  }

  reverseSorting()
  {
    this.isSortingReversed = !this.isSortingReversed;
    const reverseButton = document.getElementById("sortReverseButton");
    if (this.isSortingReversed)
    {
      reverseButton?.classList.add("sortReversed");
    }
    else
    {
      reverseButton?.classList.remove("sortReversed");
    }
    this.sortGalleries();
  }

//#endregion Sorting
}