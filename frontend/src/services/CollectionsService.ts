import $api from '../http';
import { AxiosResponse } from 'axios';
import { Collection } from '../types/Collection';

export class CollectionsService {
  static async getCollection(): Promise<AxiosResponse<Collection[]>> {
    return $api.get<Collection[]>(`/collections`)
  }

  static async setCollection(data: Collection): Promise<AxiosResponse<Collection>> {
    return $api.post<Collection>(`/collections`, data)
  }

  static async remove(collectionId: string): Promise<AxiosResponse<Collection>> {
    return $api.delete<Collection>(`/collections/${collectionId}`)
  }

  static async changeTitle(collectionId: string, title: string): Promise<AxiosResponse<Collection>> {
    return $api.patch<Collection>(`/collections/${collectionId}`, { title: title })
  }
}
