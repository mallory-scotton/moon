/** Dependencies */
import { Scanner } from './scanner';

/**
 * @brief Scanner manager class.
 * @description This class is responsible for managing all scanner instances and their operations.
 */
class ScannerManager {
  /** Class members */
  private _scanners: Map<number, Scanner>;
  private _queuedLibrarySections: Set<number>;
  private _maxScanners: number;

  /**
   * @brief Constructor
   * @description Initializes the scanner manager and its internal data structures.
   * @param maxScanners - The maximum number of scanners to manage.
   */
  constructor(maxScanners: number = 3) {
    this._scanners = new Map();
    this._queuedLibrarySections = new Set();
    this._maxScanners = maxScanners;
  }

  /**
   * @brief Gets all active scanners.
   * @description This method returns a map of all active scanner instances.
   * @returns Map<number, Scanner> - A map of active scanners, keyed by their library section ID.
   */
  public get scanners(): Map<number, Scanner> {
    return this._scanners;
  }

  /**
   * @brief Checks if a scan is in progress for a specific library section.
   * @description This method checks if there is an active scanner for the given library section ID.
   * @param librarySectionID - The ID of the library section to check.
   * @returns boolean - True if a scan is in progress, false otherwise.
   */
  public isScanning(librarySectionID: number): boolean {
    return Array.from(this._scanners.values()).some((s) => s.librarySectionID === librarySectionID);
  }

  /**
   * @brief Checks if a scan is queued for a specific library section.
   * @description This method checks if there is a queued scanner for the given library section ID.
   * @param librarySectionID - The ID of the library section to check.
   * @returns boolean - True if a scan is queued, false otherwise.
   */
  public isQueued(librarySectionID: number): boolean {
    return this._queuedLibrarySections.has(librarySectionID);
  }

  /**
   * @brief Initiates a scan for a specific library section.
   * @description This method starts a scan for the given library section ID if no scan is already in progress or queued.
   * @param librarySectionID - The ID of the library section to scan.
   * @returns boolean - True if the scan was initiated, false otherwise.
   */
  public scanLibrary(librarySectionID: number): boolean {
    // Check if a scan is already in progress or queued
    if (!this.isScanning(librarySectionID) && !this.isQueued(librarySectionID)) {
      // Add the library section ID to the queue
      this._queuedLibrarySections.add(librarySectionID);
      // Process the queue
      this._processQueue();
      // Library section is now being scanned
      return true;
    }
    // Library section is already being scanned or queued
    return false;
  }

  /**
   * @brief Processes the scan queue.
   * @description This method processes the scan queue and starts new scans as resources become available.
   */
  private _processQueue(): void {
    // If there are available scanners and queued library sections
    if (this._scanners.size >= this._maxScanners || this._queuedLibrarySections.size == 0) {
      return;
    }

    // Get the next library section ID from the queue
    const librarySectionID = this._queuedLibrarySections.values().next().value!;
    // Remove the library section ID from the queue
    this._queuedLibrarySections.delete(librarySectionID);

    try {
      // Create a new scanner for the library section
      const scanner = new Scanner(librarySectionID);
      // Add the scanner to the active scanners map
      this._scanners.set(librarySectionID, scanner);

      // Add event for the scanner
      scanner.on('completed', () => {
        // Remove the scanner from the active scanners map
        this._scanners.delete(librarySectionID);
        // Process the next library section in the queue
        this._processQueue();
      });

      // Start the scanner
      scanner.start();
    } catch (error) {
      // Stop and remove the scanner if an error occurs during initialization
      this._scanners.get(librarySectionID)?.stop();
      // Remove the scanner from the active scanners map
      this._scanners.delete(librarySectionID);
    }

    // Process the next library section in the queue
    this._processQueue();
  }
}

/**
 * @brief Scanner manager instance.
 * @description This instance is responsible for managing all scanner operations.
 */
export const scannerManager = new ScannerManager();
