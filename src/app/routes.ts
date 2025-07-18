import {Routes} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { GalleryCategoriesComponent } from './gallery-categories/gallery-categories.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReposComponent } from './repos/repos.component';
import { LinkTreeComponent } from './link-tree/link-tree.component';

const routeConfig: Routes = [
    {
      path: '',
      component: AboutComponent,
      title: 'About Me',
    },
    {
      path: 'gallery',
      component: GalleryCategoriesComponent,
      title: 'Photo Categories',
    },
    {
      path: 'gallery/:galleryname',
      component: GalleryComponent,
      title: 'Photo Gallery',
    },
    {
      path: 'repos',
      component: ReposComponent,
      title: 'My Repositories',
    },
    {
      path: 'linktree',
      component: LinkTreeComponent,
      title: 'Links',
    },
    {
      path: '**',
      redirectTo : ''
    }
  ];

export default routeConfig;