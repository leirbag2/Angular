import { Injectable } from '@angular/core';
import { ColumnFilterFormElement } from 'primeng/table';
@Injectable({
  providedIn: 'root',
})
export class OverwritePrimeNgService {
  constructor() {}

  overridePrimeNGTableColumnFilter() {
    ColumnFilterFormElement.prototype.ngOnInit = function () {
      if (this.filterConstraint) {
        this.filterConstraint.matchMode = 'contains';
      }
    };
    ColumnFilterFormElement.prototype.onModelChange = function (value) {
      if (this.filterConstraint) {
        this.filterConstraint.value = value;
        if (this.type || value === '') {
          this.dt._filter();
        }
      }
    };
  }
}
