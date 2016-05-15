import {noView, bindable, customElement, View} from 'aurelia-framework';
@customElement("au-column")
@noView()
export class AuColumn {
    @bindable property: string;
    @bindable header: string;
    @bindable type: string = "text";
    @bindable format: string;
    @bindable sortable: boolean = true;
    @bindable editable: boolean = false;
    @bindable filterable: boolean = false;

}
