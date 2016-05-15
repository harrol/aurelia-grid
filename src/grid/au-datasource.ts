
export interface AuDatasource {
    page?(start: number, size: number): any[];
    allData(): any[];
    rowCount: number;
}