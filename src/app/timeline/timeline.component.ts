import { Component, Input } from '@angular/core';

import { TimelineItemComponent } from '../timeline-item/timeline-item.component';
import { TimelineEntry } from '../interfaces/timeline-entry';

@Component({
    selector: 'mw-timeline',
    imports: [TimelineItemComponent],
    templateUrl: './timeline.component.html',
    styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  @Input() timelineEntries!: TimelineEntry[];
}
