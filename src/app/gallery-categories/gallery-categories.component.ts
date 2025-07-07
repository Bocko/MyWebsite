import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PhotoHandlerService } from '../services/photo-handler.service';
import { CategoryEntry } from '../interfaces/photo-entry';

@Component({
  selector: 'mw-gallery-categories',
  imports: [ RouterModule, CommonModule ],
  templateUrl: './gallery-categories.component.html',
  styleUrl: './gallery-categories.component.scss'
})
export class GalleryCategoriesComponent
{  
  photoHandler: PhotoHandlerService = inject(PhotoHandlerService);
  categories: CategoryEntry[] = [];


  constructor()
  {
    this.photoHandler.getGalleryCategories().then((categories: CategoryEntry[]) => 
    {
      this.categories = categories;
    });
  }
}
