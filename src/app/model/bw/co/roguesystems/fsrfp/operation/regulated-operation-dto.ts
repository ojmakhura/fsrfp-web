import { FormBuilder } from '@angular/forms';
import { AuditableDTO } from '@model/bw/co/roguesystems/fsrfp/auditable-dto';

import { DocumentDTO } from '@app/model/bw/co/roguesystems/fsrfp/document/document-dto';
import { RegulatorDTO } from '@app/model/bw/co/roguesystems/fsrfp/regulator/regulator-dto';

export class RegulatedOperationDTO extends AuditableDTO {
  name?: string;

  description?: string;

  documents?: Array<DocumentDTO>;

  regulator?: RegulatorDTO;
  constructor() {
    super();
  }
}
