import { FormBuilder } from '@angular/forms';
import { AuditableDTO } from '@model/bw/co/roguesystems/fsrfp/auditable-dto';

export class RegulatedOperationProcessDTO extends AuditableDTO {
  description?: string;

  processId?: string;

  process?: string;

  operationId?: string;

  operation?: string;

  initialProcess?: boolean = false;

  nextId?: string;

  next?: string;

  previousId?: string;

  previous?: string;

  processRegulator?: string;

  constructor() {
    super();
  }
}
