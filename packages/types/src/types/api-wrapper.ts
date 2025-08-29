/**
 * @brief Interface for API request options.
 * @description This interface defines the structure for options that can be passed with an API request.
 */
export interface ApiRequestOptions {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  body?: unknown;
}

/**
 * @brief Interface for API configuration.
 * @description This interface defines the configuration options for the API wrapper, including the base URL, default headers, and API key.
 */
export interface ApiConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  apiKey?: string;
  apiKeyFormat?: string;
}

/**
 * @brief Abstract class for API wrapper.
 * @description This abstract class provides a base implementation for API wrappers, including common methods for making API requests.
 * @example
 * class MyApiWrapper extends ApiWrapper {
 *   constructor() {
 *     super({
 *       baseUrl: 'https://api.example.com',
 *       apiKey: 'your_api_key',
 *     });
 *   }
 * }
 */
export abstract class ApiWrapper {
  /** Class members */
  protected _config: Required<ApiConfig>;

  /**
   * @brief Constructor for ApiWrapper
   * @description Initializes the ApiWrapper with the provided configuration.
   * @param config - The configuration object for the API wrapper.
   */
  constructor(config: ApiConfig) {
    // Initialize the _config property with the provided configuration
    this._config = {
      baseUrl: config.baseUrl,
      defaultHeaders: config.defaultHeaders || {},
      apiKey: config.apiKey || '',
      apiKeyFormat: config.apiKeyFormat || 'api_key'
    };
  }

  /**
   * @brief Builds the full URL for a given API endpoint.
   * @description This method constructs the complete URL for a specific API endpoint by appending any query parameters.
   * @param endpoint - The API endpoint path.
   * @param params - An optional object containing query parameters.
   * @returns The fully constructed URL as a string.
   */
  protected buildUrl(endpoint: string, params?: Record<string, any>, isFull: boolean = false): string {
    // Create a new URL object for the API endpoint
    const url = new URL(endpoint, isFull ? undefined : this._config.baseUrl);

    // Append query parameters to the URL
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        // Skip undefined or null values
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      }
    }

    // Append the API key to the URL if it exists
    if (this._config.apiKey) {
      url.searchParams.append(this._config.apiKeyFormat, this._config.apiKey);
    }

    // Return the constructed URL as a string
    return url.toString();
  }

  /**
   * @brief Makes an API request.
   * @description This method performs an API request to the specified endpoint with the given options.
   * @param method - The HTTP method to use for the request.
   * @param endpoint - The API endpoint to call.
   * @param options - The options to include in the request.
   * @returns The response from the API call.
   * @throws An error if the API request fails.
   */
  protected async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    // Build the full URL for the API request
    const url = this.buildUrl(endpoint, options.params);

    // Make the API request
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...this._config.defaultHeaders,
        ...options.headers
      }
    });

    // Check for errors
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Parse the JSON response
    return (await response.json()) as T;
  }

  /**
   * @brief Makes a GET request to the API.
   * @description This method performs a GET request to the specified API endpoint with the given options.
   * @param endpoint - The API endpoint to call.
   * @param options - The options to include in the request.
   * @returns The response from the API call.
   * @throws An error if the API request fails.
   */
  protected get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('GET', endpoint, options);
  }

  /**
   * @brief Makes a POST request to the API.
   * @description This method performs a POST request to the specified API endpoint with the given options.
   * @param endpoint - The API endpoint to call.
   * @param options - The options to include in the request.
   * @returns The response from the API call.
   * @throws An error if the API request fails.
   */
  protected post<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('POST', endpoint, {
      ...options,
      body: typeof body === 'object' ? JSON.stringify(body) : body
    });
  }

  /**
   * @brief Makes a PUT request to the API.
   * @description This method performs a PUT request to the specified API endpoint with the given options.
   * @param endpoint - The API endpoint to call.
   * @param options - The options to include in the request.
   * @returns The response from the API call.
   * @throws An error if the API request fails.
   */
  protected put<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('PUT', endpoint, {
      ...options,
      body: typeof body === 'object' ? JSON.stringify(body) : body
    });
  }

  /**
   * @brief Makes a PATCH request to the API.
   * @description This method performs a PATCH request to the specified API endpoint with the given options.
   * @param endpoint - The API endpoint to call.
   * @param options - The options to include in the request.
   * @returns The response from the API call.
   * @throws An error if the API request fails.
   */
  protected patch<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('PATCH', endpoint, {
      ...options,
      body: typeof body === 'object' ? JSON.stringify(body) : body
    });
  }

  /**
   * @brief Makes a DELETE request to the API.
   * @description This method performs a DELETE request to the specified API endpoint with the given options.
   * @param endpoint - The API endpoint to call.
   * @param options - The options to include in the request.
   * @returns The response from the API call.
   * @throws An error if the API request fails.
   */
  protected delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>('DELETE', endpoint, options);
  }

  /**
   * @brief Downloads a file from the API.
   * @description This method performs a GET request to the specified API endpoint to download a file.
   * @param endpoint - The API endpoint to call.
   * @param options - The options to include in the request.
   * @returns The downloaded file as a Blob or Buffer.
   * @throws An error if the API request fails.
   */
  protected async download(endpoint: string, options: ApiRequestOptions = {}): Promise<Blob | Buffer> {
    // Build the full URL for the API request
    const url = this.buildUrl(endpoint, options.params);

    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...this._config.defaultHeaders,
        ...options.headers
      }
    });

    // Check for errors
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Return the response as a Blob or Buffer
    if (typeof window !== 'undefined') {
      return await response.blob();
    }

    // Return the response as a Blob or Buffer
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  }

  /**
   * @brief Downloads a file from a given URL.
   * @description This method performs a GET request to the specified full URL to download a file.
   * @param fullURL - The full URL of the file to download.
   * @param options - The options to include in the request.
   * @returns The downloaded file as a Blob or Buffer.
   * @throws An error if the API request fails.
   */
  protected async downloadFromURL(fullURL: string, options: ApiRequestOptions = {}): Promise<Blob | Buffer> {
    // Build the full URL for the API request
    const url = this.buildUrl(fullURL, options.params, true);

    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...this._config.defaultHeaders,
        ...options.headers
      }
    });

    // Check for errors
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Return the response as a Blob or Buffer
    if (typeof window !== 'undefined') {
      return await response.blob();
    }

    // Return the response as a Blob or Buffer
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  }
}
