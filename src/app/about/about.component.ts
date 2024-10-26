import { Component } from '@angular/core';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

@Component({
  selector: 'mw-about',
  standalone: true,
  imports: [TimelineItemComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  
}
