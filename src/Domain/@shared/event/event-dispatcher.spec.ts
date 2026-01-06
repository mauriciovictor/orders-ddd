import { describe, expect, it } from 'vitest';
import EventDispatcher from './event-dispatcher.js';
import { SendEmailWhenProductIsCreatedHandler } from './product/handler/send-email-when-product-is-created.handler.js';

describe('Domain event tests', () => {
  it('should regiister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBeDefined();
  });
});
