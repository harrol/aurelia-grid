import {AuDatasource} from './au-datasource';
import {AuColumn, SortOrder} from './au-column';
import {AuRow} from './au-row';
import {inject, bindable, bindingMode, children, customElement} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';


@customElement("au-grid")
@inject(EventAggregator)
export class AuGrid {
  @bindable({defaultBindingMode: bindingMode.twoWay}) datasource:AuDatasource;
  @bindable rows:number = 10;
  startRow:number = 0;
  currentPage:number = 1;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedRow:AuRow;
  private allData: any[];
  private originalData: any[];
  data:any;
  
  constructor(private eventAggregator:EventAggregator) {
  }


  @children('au-column')
  columns:Array<AuColumn>;

  get totalPages():number {
    let pages = this.datasource.rowCount / this.rows;
    return Math.ceil(pages);
  }

  private setPageData() {
    let startRow:number = (this.currentPage - 1) * this.rows;
    let size:number = startRow + (1 * this.rows); // To prevent it from becoming a string, but why?!?!?!?
    this.data = this.allData.slice(startRow, size);
  }

  nextPage():void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.setPageData();
    }
  }

  previousPage():void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.setPageData();
    }
  }

  rowClicked(index:number, data:any) {
    this.selectedRow = new AuRow(index, data);
    this.eventAggregator.publish("au-grid:row:selected", data);

  }

  sort(colNr:any) {
    let column = this.columns[colNr];
    if(column.sortOrder == SortOrder.NONE) {
        column.sortOrder = SortOrder.ASC;
    } else if (column.sortOrder == SortOrder.ASC) {
      column.sortOrder = SortOrder.DESC;
    } else {
      column.sortOrder = SortOrder.NONE;
    }
    if(column.sortOrder == SortOrder.NONE) {
      // restore original sort order
      this.allData = this.originalData.slice();
    } else {
      let factor = column.sortOrder == SortOrder.ASC ? 1 : -1;
      this.allData.sort((a, b) => {
        return this.compareStrings(a[column.property], b[column.property]) * factor;
      });
    }
    this.setPageData();
    this.eventAggregator.publish("au-grid:column:sorted", colNr);
  }

  private compareStrings(a: string, b: string) : number {
    return (a < b ? -1 :( a > b ? 1 : 0));
  }

  private compareNumbers(a: number, b: number) : number {
    return a - b;
  }

  attached() {
    this.allData = this.datasource.allData();
    this.originalData = this.allData.slice();
    this.setPageData();
  }

}
