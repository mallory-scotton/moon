/** Dependencies */
import { EventEmitter } from 'node:events';

/**
 * @brief Typed Event Emitter
 * @description A class that extends the EventEmitter to provide type-safe event handling.
 * @example
 * const emitter = new TypedEventEmitter<{
 *   event1: (arg: string) => void;
 *   event2: (arg: number) => void;
 * }>();
 *
 * emitter.on('event1', (arg) => {
 *   console.log(`event1 received: ${arg}`);
 * });
 *
 * emitter.on('event2', (arg) => {
 *   console.log(`event2 received: ${arg}`);
 * });
 */
export class TypedEventEmitter<Events extends { [K in keyof Events]: (...args: any[]) => any }> {
  /** Class members */
  private emitter = new EventEmitter();

  /**
   * @brief Registers an event listener for the specified event.
   * @description This method allows you to listen for specific events emitted by the event emitter.
   * @param event - The name of the event to listen for.
   * @param listener - The callback function to execute when the event is emitted.
   * @returns The instance of the TypedEventEmitter for chaining.
   * @example
   * emitter.on('event1', (arg) => {
   *   console.log(`event1 received: ${arg}`);
   * });
   */
  public on<K extends keyof Events>(event: K, listener: Events[K]): this {
    this.emitter.on(event as string, listener as (...args: any[]) => void);
    return this;
  }

  /**
   * @brief Registers a one-time event listener for the specified event.
   * @description This method allows you to listen for specific events emitted by the event emitter, but the listener will be invoked at most once.
   * @param event - The name of the event to listen for.
   * @param listener - The callback function to execute when the event is emitted.
   * @returns The instance of the TypedEventEmitter for chaining.
   * @example
   * emitter.once('event1', (arg) => {
   *   console.log(`event1 received: ${arg}`);
   * });
   */
  public once<K extends keyof Events>(event: K, listener: Events[K]): this {
    this.emitter.once(event as string, listener as (...args: any[]) => void);
    return this;
  }

  /**
   * @brief Registers an event listener for the specified event.
   * @description This method allows you to listen for specific events emitted by the event emitter.
   * @param event - The name of the event to listen for.
   * @param listener - The callback function to execute when the event is emitted.
   * @returns The instance of the TypedEventEmitter for chaining.
   * @example
   * emitter.off('event1', (arg) => {
   *   console.log(`event1 received: ${arg}`);
   * });
   */
  public off<K extends keyof Events>(event: K, listener: Events[K]): this {
    this.emitter.off(event as string, listener as (...args: any[]) => void);
    return this;
  }

  /**
   * @brief Emits an event with the specified arguments.
   * @description This method allows you to emit events to all registered listeners.
   * @param event - The name of the event to emit.
   * @param args - The arguments to pass to the event listeners.
   * @returns A boolean indicating whether the event had listeners and was emitted.
   * @example
   * emitter.emit('event1', 'Hello, world!');
   */
  public emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): boolean {
    return this.emitter.emit(event as string, ...args);
  }
}
