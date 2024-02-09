import { DocumentType } from '@typegoose/typegoose';
import { CityDTO } from './city.dto.js';
import { CityEntity } from './city.model.js';

export interface ICityService {
  create(dto: CityDTO): Promise<DocumentType<CityEntity>>;
  findById(id: string): Promise<DocumentType<CityEntity> | null>;
  findByName(name: string): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(dto: CityDTO): Promise<DocumentType<CityEntity>>;
}
