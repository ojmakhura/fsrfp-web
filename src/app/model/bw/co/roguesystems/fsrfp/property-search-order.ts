import { FormBuilder } from '@angular/forms';

import { SortOrder } from '@app/model/bw/co/roguesystems/fsrfp/sort-order';

export class PropertySearchOrder {
  propertyName?: string;

  order?: SortOrder;

  constructor() {}
}
