import EventHandlerInterface from '../../event-handler.interface.js';
import CostumerCreatedEvent from '../costumer-created.event.js';

export class EnviarConsoleLogHandle1Handler implements EventHandlerInterface<CostumerCreatedEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(_event: CostumerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}
