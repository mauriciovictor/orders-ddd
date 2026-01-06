import { describe, expect, it, vi } from 'vitest';
import EventDispatcher from './event-dispatcher.js';
import { SendEmailWhenProductIsCreatedHandler } from './product/handler/send-email-when-product-is-created.handler.js';
import ProductCreatedEvent from './product/product-created.event.js';

describe('Domain event tests', () => {
  it('should regiister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBeDefined();
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
  });

  it('should unregister all events ', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'ProductCreatedEvent',
      data: {
        product: {
          id: 1,
          name: 'Product 1',
          description: 'Product 1 description',
          price: 100,
          createAt: new Date(),
        },
      },
    });

    //quando o notify for executado sendEmailWhenProductCreatedHandler.handle deve ser chamado
    const spyEventHandler = vi.spyOn(eventHandler, 'handle');

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
