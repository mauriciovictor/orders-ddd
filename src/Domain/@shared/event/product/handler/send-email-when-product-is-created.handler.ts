import EventHandlerInterface from '../../event-handler.interface.js';
import ProductCreatedEvent from '../product-created.event.js';

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(_event: ProductCreatedEvent): void {
    console.log('Sending email to......');
  }
}
