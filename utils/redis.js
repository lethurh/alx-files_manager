import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    // Handle Redis client errors
    this.client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });

    // Connect the Redis client
    this.client.connect().catch((error) => {
      console.error('Redis Connection Error:', error);
    });
  }

  /**
   * Checks if the Redis client is alive and connected.
   * @returns {boolean} True if the client is connected, otherwise false.
   */
  isAlive() {
    return this.client.isOpen;
  }

  /**
   * Retrieves the value of a given key from Redis.
   * @param {string} key - The key to retrieve.
   * @returns {Promise<string|null>} The value stored for the key or null if the key does not exist.
   */
  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error('Error getting key from Redis:', error);
      return null;
    }
  }

  /**
   * Stores a value in Redis with a specific expiration duration.
   * @param {string} key - The key to set.
   * @param {string|number} value - The value to store.
   * @param {number} duration - Expiration time in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (error) {
      console.error('Error setting key in Redis:', error);
    }
  }

  /**
   * Deletes a key from Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>}
   */
  async del(key) {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Error deleting key from Redis:', error);
    }
  }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
