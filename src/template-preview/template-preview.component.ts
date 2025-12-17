import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TemplateService, TemplateModel } from '../services/template.service';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-template-preview',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss']
})
export class TemplatePreviewComponent implements OnInit {

  @Input() readonly = false;
  @Input() showAttachments = true;

  template!: TemplateModel;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ts: TemplateService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.ts.getOne(id).subscribe({
      next: (tpl) => {
        this.template = tpl;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  backtoedit() {
    this.location.back();
  }

  /** 🔥 INTERPOLATION LOGIC */
 getInterpolatedBody(): string {
  if (!this.template?.body) return '';

  let body = this.template.body;
  const values = this.template.formValues || {};
  const fields = this.template.schema?.fields || [];

  fields.forEach((field: any) => {
    const key = field.key;
    const label = field.label;
    const value = values[key] ?? '';

    // {{label}}
    body = body.replace(
      new RegExp(`{{\\s*${label}\\s*}}`, 'gi'),
      value
    );

    // @label
    body = body.replace(
      new RegExp(`@${label}\\b`, 'gi'),
      value
    );

    // {{key}} (optional support)
    body = body.replace(
      new RegExp(`{{\\s*${key}\\s*}}`, 'gi'),
      value
    );
  });

  return body;
}
}
