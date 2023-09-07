import { Request, Response, NextFunction } from 'express';
import collectionsService from '../service/collectionsService';
import ExceptionHandler from '../decorators/exceptionHandler';

class collectionsController {

  @ExceptionHandler()
  async getCollections(req: Request, res: Response, _next: NextFunction) {
    const userId = req.user?.id;
    const collections = await collectionsService.getCollections(userId);

    return res.json(collections);
  }

  @ExceptionHandler()
  async setCollection(req: Request, res: Response, _next: NextFunction) {
    const userId = req.user?.id;
    const collection = await collectionsService.setCollection({userId, ...req.body});

    return res.json(collection);
  }

  @ExceptionHandler()
  async updateCollection(req: Request, res: Response, _next: NextFunction) {
    const userId = req.user?.id;
    const id = req.params.id;
    const data = req.body;
    const collection = await collectionsService.updateCollection(userId, id, data);

    return res.json(collection);
  }

  @ExceptionHandler()
  async deleteCollection(req: Request, res: Response, _next: NextFunction) {
    const userId = req.user?.id;
    const id = req.params.id;
    const collection = await collectionsService.deleteCollection(userId, id);

    return res.json(collection);
  }
}

export default new collectionsController();
