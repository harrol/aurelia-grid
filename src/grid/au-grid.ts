import {AuDatasource} from './au-datasource';
import {AuColumn} from './au-column';
import {AuRow} from './au-row';
import {inject, bindable, bindingMode, children, customElement} from 'aurelia-framework';

@customElement("au-grid")
export class AuGrid {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) datasource: AuDatasource;
    @bindable rows: number = 10;
    startRow: number = 0;
    currentPage: number = 1;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedRow: AuRow;
    private allData: any[];
    data: any;
    

    @children('au-column')
    columns: Array<AuColumn>;

    get totalPages(): number {
        let pages = this.datasource.rowCount / this.rows;
        return Math.ceil(pages);
    }

    private setPageData() {
        let startRow: number = (this.currentPage - 1) * this.rows;
        let size: number = startRow + (1 * this.rows); // To prevent it from becoming a string, but why?!?!?!?
        this.data = this.allData.slice(startRow, size);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
            this.setPageData();
        }
    }

    previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.setPageData();
        }
    }

    rowClicked(index: number, data: any) {
        this.selectedRow = new AuRow(index, data);
    }

    sort(event: any) {
        console.log(event);
    }

    attached() {
        this.allData = this.datasource.allData();
        this.setPageData();
    }

}