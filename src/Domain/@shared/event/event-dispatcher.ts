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

  unregister(eventName: string, eventHandler: EventHandlerInterface) {}
  unregisterAll() {}
  notify(event: EventInterface) {}
}
