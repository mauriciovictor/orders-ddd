import EventInterface from '../../@shared/event/event.interface.js';

export default class CustomerChangedAddressEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
