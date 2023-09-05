import { Request, Response, NextFunction } from 'express';
import collectionsService from '../service/collectionsService';

class collectionsController {
  async getCollections(req: Request, res: Response, _next: NextFunction) {
    const userId = req.user?.id;
    const collections = await collectionsService.getCollections(userId);

    return res.json(collections);
  }

  async setCollection(req: Request, res: Response, _next: NextFunction) {
    const userId = req.user?.id;
    const collection = await collectionsService.setCollection({userId, ...req.body});

    return res.json(collection);
  }

  async updateCollection(req: Request, res: Response, _next: NextFunction) {
    const id = req.params.id;
    const data = req.body;
    const collection = await collectionsService.updateCollection(id, data);

    return res.json(collection);
  }
}

export default new collectionsController();
