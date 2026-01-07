import { describe, expect, it, vi } from 'vitest';
import { Customer } from '../entity/customer.js';
import { Address } from '../ValueObject/Address.js';
import EventDispatcher from '../../@shared/event/event-dispatcher.js';
import { EnviarConsoleLogHandle1Handler } from './handler/enviar-console-log-handle1.handler.js';
import CostumerCreatedEvent from './costumer-created.event.js';
import { EnviarConsoleLogHandle2Handler } from './handler/enviar-console-log-handle2.handler.js';
import { SendEmailWhenProductIsCreatedHandler } from '../../product/event/handler/send-email-when-product-is-created.handler.js';
import CustomerChangedAddressEvent from './customer-changed-address.event.js';
import { SendEmailWhenUserChangedAdressHandler } from './handler/send-email-when-user-changed-adress.handler.js';

describe('CustomerDispatcherEvent', () => {
  it('should dispatcher event when created user', () => {
    const costumer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', '123', '12345', 'City 1');
    costumer.setAddress(address);

    const eventDispatcher = new EventDispatcher();
    const costumerCreatedEvent = new CostumerCreatedEvent({
      name: 'CostumerCreatedEvent',
      data: {
        customer: costumer,
      },
    });

    const enviarConsoleLogHandle1Handler = new EnviarConsoleLogHandle1Handler();
    const enviarConsoleLogHandle2Handler = new EnviarConsoleLogHandle2Handler();

    const spyCreateedCostumerEventHandlers1 = vi.spyOn(enviarConsoleLogHandle1Handler, 'handle');
    const spyCreateedCostumerEventHandlers2 = vi.spyOn(enviarConsoleLogHandle2Handler, 'handle');

    eventDispatcher.register('CostumerCreatedEvent', enviarConsoleLogHandle1Handler);
    eventDispatcher.register('CostumerCreatedEvent', enviarConsoleLogHandle2Handler);

    eventDispatcher.notify(costumerCreatedEvent);

    expect(spyCreateedCostumerEventHandlers1).toHaveBeenCalled();
    expect(spyCreateedCostumerEventHandlers2).toHaveBeenCalled();
  });

  it('should dispatcher event when user change address', () => {
    const costumer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', '123', '12345', 'City 1');
    costumer.setAddress(address);

    costumer.changeAddress(new Address('Street 2', '456', '67890', 'City 2'));

    const eventDispatcher = new EventDispatcher();

    const custumerChangedAddressEvent = new CustomerChangedAddressEvent({
      name: 'CustomerChangedAddressEvent',
      data: {
        customer: costumer,
      },
    });

    const sendEmailWhenUserChangedAddressHandler = new SendEmailWhenUserChangedAdressHandler();

    eventDispatcher.register('CustomerChangedAddressEvent', sendEmailWhenUserChangedAddressHandler);

    const spyHandler = vi.spyOn(sendEmailWhenUserChangedAddressHandler, 'handle');
    eventDispatcher.notify(custumerChangedAddressEvent);

    expect(spyHandler).toHaveBeenCalled();
  });
});
