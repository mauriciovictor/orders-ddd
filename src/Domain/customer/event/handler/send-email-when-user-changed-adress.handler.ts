import EventHandlerInterface from '../../../@shared/event/event-handler.interface.js';
import CustomerChangedAddressEvent from '../customer-changed-address.event.js';
import { Customer } from '../../entity/customer.js';

export class SendEmailWhenUserChangedAdressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
  handle(event: CustomerChangedAddressEvent): void {
    const customer = event.eventData.data.customer as Customer;
    console.log(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address.city}, ${customer.address.street}, ${customer.address.number},  ${customer.address.zip}`
    );
  }
}
