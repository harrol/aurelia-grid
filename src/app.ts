import {DataSource} from './dataSource';
import {AuRow} from './grid/au-row';
export class App {
  
  dataSource: DataSource = new DataSource();
  
  selected: AuRow;
  
  rowClicked(event: any) : void {
    console.log("Row clicked in grid");
    console.log(event);
  }
  
  
}
