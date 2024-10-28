import { Component, Input } from '@angular/core';
import { TimelineEntry } from '../interfaces/timeline-entry';

@Component({
  selector: 'mw-timeline-item',
  standalone: true,
  imports: [],
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent {
  @Input() entryInfo! : TimelineEntry;
}
