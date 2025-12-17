import { Component, Input, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  attachments: { name: string; url: string }[] = [];

  template!: TemplateModel;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ts: TemplateService,
    private location:Location
  ) { }

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

  backtoedit(){
    
    this.location.back();


  }
}
