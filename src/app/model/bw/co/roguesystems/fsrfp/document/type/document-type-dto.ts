import { FormBuilder } from '@angular/forms';
import { AuditableDTO } from '@model/bw/co/roguesystems/fsrfp/auditable-dto';

export class DocumentTypeDTO extends AuditableDTO {
  code?: string;

  name?: string;

  description?: string;

  constructor() {
    super();
  }
}
