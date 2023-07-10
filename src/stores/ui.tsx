import { action, observable, computed, runInAction, makeObservable, toJS } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { HotTable } from '@handsontable/react'
import { TABLE_SIZE } from '@/constants';

enableStaticRendering(typeof window === 'undefined')

export class Ui {
  tableSize = TABLE_SIZE.MIN;
  hotTable?: HotTable;
  menuOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      tableSize: observable,
      menuOpen: observable,
    })
  }

  setTableSize(size: TABLE_SIZE) {
    this.tableSize = size;
  }

  setHotTable(hotTable: HotTable) {
    this.hotTable = hotTable;
  }

}
