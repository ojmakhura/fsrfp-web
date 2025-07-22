import { FormBuilder } from '@angular/forms';

import { PropertySearchOrder } from '@app/model/bw/co/roguesystems/fsrfp/property-search-order';

export class SearchObject {
  criteria?: T;

  paged?: boolean = false;

  pageNumber?: number;

  pageSize?: number;

  sortings?: Array<PropertySearchOrder>;

  constructor() {}
}
