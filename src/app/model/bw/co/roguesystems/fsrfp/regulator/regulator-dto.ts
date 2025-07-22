import { FormBuilder } from '@angular/forms';
import { AuditableDTO } from '@model/bw/co/roguesystems/fsrfp/auditable-dto';

import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';

export class RegulatorDTO extends AuditableDTO {
  abbreviation?: string;

  name?: string;

  description?: string;

  documents?: Array<DocumentDTO>;

  website?: string;

  contactEmail?: string;

  constructor() {
    super();
  }
}
