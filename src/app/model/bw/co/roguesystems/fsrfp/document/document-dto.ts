import { FormBuilder } from '@angular/forms';
import { AuditableDTO } from '@model/bw/co/roguesystems/fsrfp/auditable-dto';

import { EntityType } from '@app/model/bw/co/roguesystems/fsrfp/entity-type';

export class DocumentDTO extends AuditableDTO {
  target?: EntityType;

  owner?: string;

  documentTypeId?: string;

  documentType?: string;

  url?: string;

  summary?: string;

  solrId?: string;

  filename?: string;

  ownerId?: string;

  documentTypeCode?: string;

  constructor() {
    super();
  }
}
