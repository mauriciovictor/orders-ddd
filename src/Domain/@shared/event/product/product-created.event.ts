import EventInterface from '../event.interface.js';

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventDate: Date;

  constructor(eventDate: Date) {
    this.dateTimeOccurred = new Date();
    this.eventDate = eventDate;
  }
}
