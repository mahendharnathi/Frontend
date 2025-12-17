// export interface TemplateSchemaField {
//     key: string;
//     label: string;
//     type: string;
//     required?: boolean;
// }

// export interface TemplateSchema {
//     fields: TemplateSchemaField[];
// }

// export interface TemplateModel {
//     id: string;
//     name: string;
//     body: string;
//     schema: { fields: any[] };
//     formValues?: any;
//     attachments?: string[];   // <-- store uploaded file names or URLs
//     published?: boolean;
// }



/* ============================
   Supported Field Types
============================ */
export type TemplateFieldType = 'text'| 'textarea'| 'number'| 'email'| 'date'| 'checkbox'| 'select'| 'radio';

export interface TemplateFieldOption {
    label: string;
    value: any;
}


export interface TemplateSchemaField {
    key: string;
    label: string;
    type: TemplateFieldType;
    required?: boolean;

    // Only used for select & radio
    options?: TemplateFieldOption[];
}


export interface TemplateSchema {
    fields: TemplateSchemaField[];
}


export interface TemplateModel {
    id: string;
    name: string;
    body: string;

    schema: TemplateSchema;      // ✅ strongly typed
    formValues?: Record<string, any>;

    attachments?: string[];
    published?: boolean;
}
