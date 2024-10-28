import { Component } from '@angular/core';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

@Component({
  selector: 'mw-timeline',
  standalone: true,
  imports: [ TimelineItemComponent ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {

}
