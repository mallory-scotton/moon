/** Dependencies */
import { HandlerStorage, EventName, EventPayload, EventHandler, GenericEventHandler, PatternHandler } from './events';

/**
 * @brief Context class for managing events and their handlers.
 * @description This class provides methods to register event handlers, emit events, and manage event history.
 * @example
 * const context = new Context();
 * context.on('event:name', (payload) => {
 *   console.log('Event received:', payload);
 * });
 */
export class Context {
  /** Class members */
  private _handlers: HandlerStorage = {
    specific: new Map(),
    generic: new Set(),
    patterns: new Map()
  };
  private _history: Array<{
    eventName: EventName;
    payload: any;
    timestamp: Date;
  }> = [];
  private _maxHistorySize: number = 256;

  /**
   * @brief Emits an event.
   * @description Emits an event with the given name and payload.
   * @param eventName - The name of the event to emit.
   * @param payload - The payload to include with the event.
   * @returns A promise that resolves when the event has been emitted.
   * @throws
   */
  async emit<T extends EventName>(eventName: T, payload: EventPayload<T>): Promise<void> {
    // Add to history
    this._history.push({
      eventName,
      payload,
      timestamp: new Date()
    });

    // Maintain history size
    if (this._history.length > this._maxHistorySize) {
      this._history.shift();
    }

    // Prepare promises
    const promises: Promise<void>[] = [];

    try {
      // Handle specific event handlers
      const specificHandlers = this._handlers.specific.get(eventName);
      if (specificHandlers) {
        for (const handler of specificHandlers) {
          promises.push(this._executeHandler(() => handler(payload)));
        }
      }

      // Handle generic handlers
      for (const handler of this._handlers.generic) {
        promises.push(this._executeHandler(() => handler(eventName, payload)));
      }

      // Handle pattern-based handlers
      for (const [pattern, handlers] of this._handlers.patterns.entries()) {
        if (this._matchesPattern(eventName, pattern)) {
          for (const handler of handlers) {
            promises.push(this._executeHandler(() => handler(eventName, payload)));
          }
        }
      }

      // Wait for all handlers to complete
      await Promise.all(promises);
    } catch (error) {
      // Log the error
      console.error('Error occurred while emitting event:', error);
      throw error;
    }
  }

  /**
   * @brief Registers an event handler.
   * @description Adds a handler for a specific event.
   * @param eventName - The name of the event to listen for.
   * @param handler - The handler function to execute when the event is emitted.
   */
  on<T extends EventName>(eventName: T, handler: EventHandler<T>): () => void {
    // Register the event handler
    if (!this._handlers.specific.has(eventName)) {
      this._handlers.specific.set(eventName, new Set());
    }

    // Get the set of handlers for the event
    const handlers = this._handlers.specific.get(eventName)!;
    handlers.add(handler);

    // Return unsubscribe function
    return () => {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this._handlers.specific.delete(eventName);
      }
    };
  }

  /**
   * @brief Registers a generic event handler.
   * @description Adds a handler for all events.
   * @param handler - The handler function to execute when any event is emitted.
   * @returns A function that can be called to unregister the handler.
   */
  onAny(handler: GenericEventHandler): () => void {
    // Register the event handler
    this._handlers.generic.add(handler);
    return () => {
      // Unregister the event handler
      this._handlers.generic.delete(handler);
    };
  }

  /**
   * @brief Registers a pattern-based event handler.
   * @description Adds a handler for events that match a specific pattern.
   * @param pattern - The pattern to match against event names.
   * @param handler - The handler function to execute when a matching event is emitted.
   * @returns A function that can be called to unregister the handler.
   */
  onPattern(pattern: string, handler: PatternHandler): () => void {
    // Register the event handler
    if (!this._handlers.patterns.has(pattern)) {
      this._handlers.patterns.set(pattern, new Set());
    }

    // Get the set of handlers for the pattern
    const handlers = this._handlers.patterns.get(pattern)!;
    handlers.add(handler);

    // Return unsubscribe function
    return () => {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this._handlers.patterns.delete(pattern);
      }
    };
  }

  /**
   * @brief Registers a one-time event handler.
   * @description Adds a handler for a specific event that will be invoked at most once.
   * @param eventName - The name of the event to listen for.
   * @param handler - The handler function to execute when the event is emitted.
   * @returns A function that can be called to unregister the handler.
   */
  once<T extends EventName>(eventName: T, handler: EventHandler<T>): () => void {
    const unsubscribe = this.on(eventName, async (payload) => {
      unsubscribe();
      await handler(payload);
    });

    return unsubscribe;
  }

  /**
   * @brief Waits for a specific event to be emitted.
   * @description Returns a promise that resolves when the event is emitted, or rejects if the timeout is reached.
   * @param eventName - The name of the event to wait for.
   * @param timeoutMs - The maximum time to wait for the event (in milliseconds).
   * @returns A promise that resolves with the event payload or rejects on timeout.
   */
  waitFor<T extends EventName>(eventName: T, timeoutMs: number = 30000): Promise<EventPayload<T>> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        unsubscribe();
        reject(new Error(`Timeout waiting for event: ${eventName}`));
      }, timeoutMs);

      const unsubscribe = this.once(eventName, (payload) => {
        clearTimeout(timeout);
        resolve(payload);
      });
    });
  }

  /**
   * @brief Retrieves the history of emitted events.
   * @description Returns an array of event objects representing the history of emitted events.
   * @param limit - The maximum number of events to retrieve (default is 50).
   * @returns An array of event objects containing the event name, payload, and timestamp.
   */
  getEventHistory(limit: number = 50): Array<{
    eventName: EventName;
    payload: any;
    timestamp: Date;
  }> {
    return this._history.slice(-limit).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * @brief Checks if there are any handlers registered for a specific event.
   * @description Returns true if there are handlers for the event, false otherwise.
   * @param eventName - The name of the event to check.
   * @returns True if there are handlers for the event, false otherwise.
   */
  hasHandlers(eventName: EventName): boolean {
    const hasSpecific = this._handlers.specific.has(eventName) && this._handlers.specific.get(eventName)!.size > 0;
    const hasGeneric = this._handlers.generic.size > 0;
    const hasPattern = Array.from(this._handlers.patterns.keys()).some((pattern) =>
      this._matchesPattern(eventName, pattern)
    );

    // Check if there are any handlers registered
    return hasSpecific || hasGeneric || hasPattern;
  }

  /**
   * @brief Removes all event handlers.
   * @description Clears all registered event handlers for specific, generic, and pattern-based events.
   */
  removeAllHandlers(): void {
    this._handlers.specific.clear();
    this._handlers.generic.clear();
    this._handlers.patterns.clear();
  }

  /**
   * @brief Retrieves the count of registered event handlers.
   * @description Returns an object containing the counts of specific, generic, and pattern-based event handlers.
   * @returns An object with the counts of event handlers.
   */
  getHandlerCounts(): {
    specific: Record<string, number>;
    generic: number;
    patterns: Record<string, number>;
  } {
    // Count specific handlers
    const specific: Record<string, number> = {};
    for (const [eventName, handlers] of this._handlers.specific.entries()) {
      specific[eventName] = handlers.size;
    }

    // Count pattern-based handlers
    const patterns: Record<string, number> = {};
    for (const [pattern, handlers] of this._handlers.patterns.entries()) {
      patterns[pattern] = handlers.size;
    }

    // Count generic handlers
    return {
      specific,
      generic: this._handlers.generic.size,
      patterns
    };
  }

  /**
   * @brief Executes an event handler.
   * @description Wraps the handler execution in a try-catch block to handle errors.
   * @param handlerFn - The handler function to execute.
   * @returns A promise that resolves when the handler has completed.
   */
  private async _executeHandler(handlerFn: () => void | Promise<void>): Promise<void> {
    // Wrap in try-catch
    try {
      await handlerFn();
    } catch (error) {
      console.error('Handler execution failed:', error);
    }
  }

  /**
   * @brief Checks if an event name matches a pattern.
   * @description Supports wildcard patterns for flexible matching.
   * @param eventName - The name of the event to check.
   * @param pattern - The pattern to match against.
   * @returns True if the event name matches the pattern, false otherwise.
   */
  private _matchesPattern(eventName: EventName, pattern: string): boolean {
    // If the pattern is a wildcard, it matches everything
    if (pattern === '*') {
      return true;
    }

    // If the pattern ends with a wildcard, it matches the prefix
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1);
      return eventName.startsWith(prefix);
    }

    // If the pattern starts with a wildcard, it matches the suffix
    if (pattern.startsWith('*')) {
      const suffix = pattern.slice(1);
      return eventName.endsWith(suffix);
    }

    // If the pattern is a literal string, it matches exactly
    return eventName === pattern;
  }
}
