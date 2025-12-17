import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {

  @Input() schema: any = { fields: [] };
  @Input() value: any ;
  @Input() readonly = false;
@Input() previewAttachmentsOnly = false;
@Input() attachments: { name: string; url: string }[] = [];


  @Output() valueChange = new EventEmitter<any>();

  openDateKey: string | null = null;
   
 get validAttachments(): { name: string; url: string }[] {
  return (this.attachments || [])
    .map((f: any) => {
      // If backend sent string instead of object
      if (typeof f === 'string') {
        const parts = f.split('/');
        return {
          name: decodeURIComponent(parts[parts.length - 1]),
          url: f
        };
      }

      // If valid object
      if (f && f.url) {
        return {
          name: f.name || decodeURIComponent(f.url.split('/').pop()!),
          url: f.url
        };
      }

      return null;
    })
    .filter((item): item is { name: string; url: string } => item !== null);
}
onValueChange() {
  this.valueChange.emit(this.value);
}

 

  openCalendar(key: string) {
    this.openDateKey = key;
  }

  closeCalendar() {
    this.openDateKey = null;
  }

  selectDate(key: string, event: any) {
    this.value[key] = event.target.value;
    this.closeCalendar();
    this.onValueChange();
  }
}
