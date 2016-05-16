import {AuDatasource} from './grid/au-datasource';

export class DataSource implements AuDatasource {

    page(start: number, size: number): Array<any> {
        let result = [];
        for (let i = start; i < start + size; i++) {
            result.push({
                "column1": `Hi ${i}`,
                "column2": new Date(i * 100000000),
                "column3": i % 2 == 0
            }
            );
        }
        return result;
    }
    
    allData(): any[] {
        return this.page(0, this.rowCount);
    }

    get rowCount(): number {
        return 42;
    }

}
