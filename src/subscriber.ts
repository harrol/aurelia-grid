import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {customElement, noView} from 'aurelia-framework';

@customElement("subscriber")
@noView()
export class Subscriber {

  private subscription: Subscription;
  
  constructor(private eventAggregator: EventAggregator) {
  }


  attached() {
    this.subscription = this.eventAggregator.subscribe("au-grid-row-selected", data => {
      console.log("Click event observed: " + data.column1);
    });
  }

  detached() {
    this.subscription.dispose();
  }
  
  
  
}
