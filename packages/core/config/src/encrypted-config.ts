/** Dependencies */
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { MOON_APPDATA } from './constants';
import { config } from './config';

/**
 * @brief
 * @description
 * @example
 */
class EncryptedConfig {
  /** Class members */
  private _masterKey: Buffer;
  private _filePath: string;
  private _loaded: boolean;
  private _config: Record<string, any>;

  /**
   * @brief Constructor for the EncryptedConfig class.
   * @description Initializes the EncryptedConfig instance with a master key.
   * @param masterKey - The master key used for encryption and decryption.
   */
  constructor(masterKey: string) {
    // Initialize class members
    this._masterKey = this._deriveKey(masterKey);
    this._filePath = path.join(MOON_APPDATA, 'config', 'keys.enc');
    this._loaded = false;
    this._config = {};

    // Load the existing configuration
    this.load();
  }

  /**
   * @brief Derives a proper 32-byte key from the provided master key string.
   * @description This method ensures the master key is exactly 32 bytes for AES-256.
   * @param masterKey - The master key string to derive from.
   * @returns A 32-byte Buffer containing the derived key.
   */
  private _deriveKey(masterKey: string): Buffer {
    // Use SHA-256 to derive a consistent 32-byte key from any input string
    return crypto.createHash('sha256').update(masterKey).digest();
  }

  /**
   * @brief Generates a random initialization vector (IV) for encryption.
   * @description This method creates a random IV using the crypto library.
   * @returns A Buffer containing the generated IV.
   */
  private _generateIV() {
    // Generate a random initialization vector (IV)
    return crypto.randomBytes(16);
  }

  /**
   * @brief Encrypts the given data using the master key.
   * @description This method encrypts the provided data using AES-256-CBC encryption.
   * @param data - The plaintext data to encrypt.
   * @returns The encrypted data as a string.
   */
  private _encrypt(data: string) {
    // Encrypt the data using the master key
    const iv = this._generateIV();
    const cipher = crypto.createCipheriv('aes-256-cbc', this._masterKey, iv);

    // Encrypt the data
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Combine the IV and encrypted data
    return `${iv.toString('hex')}:${encrypted}`;
  }

  /**
   * @brief Decrypts the given encrypted data using the master key.
   * @description This method decrypts the provided encrypted data using AES-256-CBC decryption.
   * @param encryptedData - The encrypted data to decrypt.
   * @returns The decrypted plaintext data as a string.
   * @throws Error if the encrypted data format is invalid.
   */
  private _decrypt(encryptedData: string) {
    // Split the IV and encrypted data
    const [ivHex, encrypted] = encryptedData.split(':');

    // Validate the IV and encrypted data
    if (!ivHex || !encrypted) {
      throw new Error('Invalid encrypted data format');
    }

    // Decrypt the data
    const decipher = crypto.createDecipheriv('aes-256-cbc', this._masterKey, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Return the decrypted data
    return decrypted;
  }

  /**
   * @brief Parses the given INI-formatted string.
   * @description This method parses the provided INI content and returns an object representation.
   * @param content - The INI content to parse.
   * @returns An object representing the parsed INI content.
   */
  private _parseINI(content: string) {
    // Parse the INI content into a JavaScript object
    const config: Record<string, any> = {};
    const lines = content.split('\n');
    let currentSection = 'default';

    // Parse each line of the INI content
    for (let line of lines) {
      line = line.trim();

      // Skip empty lines and comments
      if (!line || line.startsWith('#') || line.startsWith(';')) {
        continue;
      }

      // Section headers [section_name]
      if (line.startsWith('[') && line.endsWith(']')) {
        currentSection = line.slice(1, -1).trim();
        if (!config[currentSection]) {
          config[currentSection] = {};
        }
        continue;
      }

      // Key-value pairs
      const equalIndex = line.indexOf('=');
      if (equalIndex > 0) {
        const key = line.slice(0, equalIndex).trim();
        const value = line.slice(equalIndex + 1).trim();

        if (!config[currentSection]) {
          config[currentSection] = {};
        }

        config[currentSection][key] = value;
      }
    }

    // Return the parsed configuration
    return config;
  }

  /**
   * @brief Converts the given object representation to an INI-formatted string.
   * @description This method takes an object representation of the configuration and converts it to an INI-formatted string.
   * @param config - The configuration object to convert.
   * @returns The INI-formatted string representation of the configuration.
   */
  private _toINI(config: Record<string, any>) {
    // Convert the configuration object to an INI-formatted string
    let content = '';

    // Iterate over each section and its key-value pairs
    for (const [section, values] of Object.entries(config)) {
      if (section !== 'default') {
        content += `[${section}]\n`;
      }

      // Add key-value pairs
      for (const [key, value] of Object.entries(values)) {
        content += `${key}=${value}\n`;
      }

      content += '\n';
    }

    // Trim any trailing whitespace
    return content.trim();
  }

  /**
   * @brief Loads the configuration from the encrypted file.
   * @description This method reads the encrypted configuration file, decrypts its contents,
   * and parses the INI data into a JavaScript object.
   */
  public load() {
    try {
      // Read the encrypted config file
      const encrypted = fs.readFileSync(this._filePath, 'utf8');
      const decrypted = this._decrypt(encrypted);
      this._config = this._parseINI(decrypted);
      this._loaded = true;
    } catch (error) {
      if (!fs.existsSync(this._filePath)) {
        // File doesn't exist, start with empty config
        this._config = {};
        this._loaded = true;
        this.save();
      } else {
        throw new Error(`Failed to load config: ${error}`);
      }
    }
  }

  /**
   * @brief Saves the configuration to the encrypted file.
   * @description This method converts the configuration object to an INI-formatted string,
   * encrypts it, and writes it to the specified file path.
   */
  public save() {
    try {
      // Ensure directory exists
      const dir = path.dirname(this._filePath);
      fs.mkdirSync(dir, { recursive: true });

      // Convert the configuration to INI format
      const iniContent = this._toINI(this._config);
      const encrypted = this._encrypt(iniContent);
      fs.writeFileSync(this._filePath, encrypted, 'utf8');
    } catch (error) {
      throw new Error(`Failed to save config: ${error}`);
    }
  }

  /**
   * @brief Retrieves a configuration value.
   * @description This method fetches a specific configuration value based on the provided key.
   * @param key - The key of the configuration value to retrieve.
   * @returns The configuration value or undefined if not found.
   * @throws Error if the configuration is not loaded.
   */
  public get(key: string) {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Split the key into section and actual key
    const [section, actualKey] = key.includes('.') ? key.split('.', 2) : ['default', key];

    return this._config[section]?.[actualKey];
  }

  /**
   * @brief Sets a configuration value.
   * @description This method updates a specific configuration value based on the provided key.
   * @param key - The key of the configuration value to set.
   * @param value - The new value to assign to the configuration key.
   * @param autoSave - Whether to automatically save the configuration after setting the value.
   * @throws Error if the configuration is not loaded.
   */
  public set(key: string, value: string, autoSave = true) {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Split the key into section and actual key
    const [section, actualKey] = key.includes('.') ? key.split('.', 2) : ['default', key];

    // Initialize the section if it doesn't exist
    if (!this._config[section]) {
      this._config[section] = {};
    }

    // Set the configuration value
    this._config[section][actualKey] = value;

    // Automatically save the configuration if specified
    if (autoSave) {
      this.save();
    }
  }

  /**
   * @brief Retrieves a section of the configuration.
   * @description This method fetches all key-value pairs for a specific section.
   * @param section - The section name to retrieve (default is 'default').
   * @returns An object containing the key-value pairs for the specified section.
   * @throws Error if the configuration is not loaded.
   */
  public getSection(section = 'default') {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Return the section configuration
    return this._config[section] ? { ...this._config[section] } : {};
  }

  /**
   * @brief Sets a section of the configuration.
   * @description This method updates all key-value pairs for a specific section.
   * @param section - The section name to update.
   * @param values - An object containing the key-value pairs to set.
   * @param autoSave - Whether to automatically save the configuration after setting the values.
   * @throws Error if the configuration is not loaded.
   */
  public setSection(section: string, values: Record<string, string>, autoSave = true) {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Initialize the section if it doesn't exist
    if (!this._config[section]) {
      this._config[section] = {};
    }

    // Update the section with new values
    Object.assign(this._config[section], values);

    // Automatically save the configuration if specified
    if (autoSave) {
      this.save();
    }
  }

  /**
   * @brief Removes a configuration value.
   * @description This method deletes a specific configuration value based on the provided key.
   * @param key - The key of the configuration value to remove.
   * @param autoSave - Whether to automatically save the configuration after removing the value.
   * @throws Error if the configuration is not loaded.
   */
  public remove(key: string, autoSave = true) {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Split the key into section and actual key
    const [section, actualKey] = key.includes('.') ? key.split('.', 2) : ['default', key];

    // Remove the configuration value if it exists
    if (this._config[section]) {
      delete this._config[section][actualKey];

      // Remove empty sections
      if (Object.keys(this._config[section]).length === 0) {
        delete this._config[section];
      }
    }

    // Automatically save the configuration if specified
    if (autoSave) {
      this.save();
    }
  }

  /**
   * @brief Lists all configuration keys.
   * @description This method retrieves all configuration keys across all sections.
   * @returns An array of strings representing the configuration keys.
   * @throws Error if the configuration is not loaded.
   */
  public listKeys() {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Collect all keys
    const keys = [];
    for (const [section, values] of Object.entries(this._config)) {
      for (const key of Object.keys(values)) {
        keys.push(section === 'default' ? key : `${section}.${key}`);
      }
    }

    // Return the collected keys
    return keys;
  }

  /**
   * @brief Checks if a configuration key exists.
   * @description This method verifies whether a specific configuration key is present.
   * @param key - The key of the configuration value to check.
   * @returns A boolean indicating whether the key exists.
   * @throws Error if the configuration is not loaded.
   */
  public has(key: string) {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Split the key into section and actual key
    const [section, actualKey] = key.includes('.') ? key.split('.', 2) : ['default', key];

    // Check if the key exists
    return !!this._config[section]?.[actualKey];
  }

  /**
   * @brief Retrieves all configuration values.
   * @description This method fetches all key-value pairs across all sections.
   * @returns An object containing all configuration key-value pairs.
   * @throws Error if the configuration is not loaded.
   */
  public getAll() {
    // Ensure the configuration is loaded
    if (!this._loaded) {
      this.load();
    }

    // Return a deep copy of the configuration
    return JSON.parse(JSON.stringify(this._config));
  }

  /**
   * @brief Clears all configuration values.
   * @description This method removes all key-value pairs across all sections.
   * @throws Error if the configuration is not loaded.
   */
  public clear(autoSave = true) {
    // Reset the configuration
    this._config = {};
    this._loaded = true;

    // Automatically save the configuration if specified
    if (autoSave) {
      this.save();
    }
  }
}

/**
 * @brief Encrypted configuration instance.
 * @description This instance is used to manage encrypted configuration settings.
 */
export const encryptedConfig = new EncryptedConfig(config.vault.encryptionKey);
