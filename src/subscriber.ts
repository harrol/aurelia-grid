import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {customElement, noView} from 'aurelia-framework';

@customElement("subscriber")
@noView()
export class Subscriber {

  private channels: string[] = ["au-grid:row:selected", "au-grid:column:sorted"];

  private subscriptions: Subscription[] = [];
  
  constructor(private eventAggregator: EventAggregator) {
  }


  attached() {
    for(let channel of this.channels) {
      this.subscriptions.push(
        this.eventAggregator.subscribe(channel, data => {
          console.log(`Event observed on ${channel}`);
          console.log(data);
        })
      );
    }
  }

  detached() {
    for(let sub of this.subscriptions) {
      sub.dispose();
    }
  }
  
  
  
}
