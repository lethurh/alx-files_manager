import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(request, response) {
    await response.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(request, response) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();

    response.status(200).json({ users, files });
  }
}

export default AppController;
