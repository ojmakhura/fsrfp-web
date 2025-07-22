import { FormBuilder } from '@angular/forms';

export class AuditableDTO {
  id?: string;

  createdBy?: string;

  createdAt?: Date;

  modifiedBy?: string;

  modifiedAt?: Date;

  constructor() {}
}
