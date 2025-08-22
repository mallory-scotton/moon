/** Dependencies */
import type { ServerEventMap } from './server';
import type { DatabaseEventMap } from './database';
import type { ScannerEventMap } from './scanner';
import type { DownloaderEventMap } from './downloader';

/**
 * @brief Event Map
 * @description Maps all events from the server and database to a unified event map.
 */
export type EventMap = {
  [K in keyof ServerEventMap as `server:${K & string}`]: ServerEventMap[K];
} & {
  [K in keyof DatabaseEventMap as `database:${K & string}`]: DatabaseEventMap[K];
} & {
  [K in keyof ScannerEventMap as `scanner:${K & string}`]: ScannerEventMap[K];
} & {
  [K in keyof DownloaderEventMap as `downloader:${K & string}`]: DownloaderEventMap[K];
} & {
  [key: `custom:${string}`]: Record<string, any>;
};

/**
 * @brief Event Names
 * @description Represents the names of all events in the event map.
 */
export type EventName = keyof EventMap;

/**
 * @brief Event Payload
 * @description Represents the payload of an event in the event map.
 */
export type EventPayload<T extends EventName> = EventMap[T];

/**
 * @brief Event Handler
 * @description Represents a handler function for an event in the event map.
 */
export type EventHandler<T extends EventName> = (payload: EventPayload<T>) => void | Promise<void>;

/**
 * @brief Generic Event Handler
 * @description Represents a generic handler function for any event in the event map.
 */
export type GenericEventHandler = <T extends EventName>(eventName: T, payload: EventPayload<T>) => void | Promise<void>;

/**
 * @brief Pattern Handler
 * @description Represents a handler function for events matching a specific pattern in the event map.
 */
export type PatternHandler = (eventName: EventName, payload: any) => void | Promise<void>;

/**
 * @brief Custom Event Handler
 * @description Represents a handler function for custom events in the event map.
 */
export interface HandlerStorage {
  specific: Map<EventName, Set<EventHandler<any>>>;
  generic: Set<GenericEventHandler>;
  patterns: Map<string, Set<PatternHandler>>;
}
