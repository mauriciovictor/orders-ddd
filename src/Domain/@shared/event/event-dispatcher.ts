import EventDispatcherInterface from './event-dispatcher.interface.js';
import EventHandlerInterface from './event-handler.interface.js';
import EventInterface from './event.interface.js';

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface) {
    const eventHandlers = this.eventHandlers[eventName];
    if (eventHandlers) {
      const index = eventHandlers.indexOf(eventHandler);
      if (index > -1) {
        eventHandlers.splice(index, 1);
      }
    }
  }
  unregisterAll() {
    this.eventHandlers = {};
  }

  notify(event: EventInterface) {
    const eventHandlers = this.eventHandlers[event.constructor.name];
    if (eventHandlers) {
      eventHandlers.forEach((eventHandler) => eventHandler.handle(event));
    }
  }
}
