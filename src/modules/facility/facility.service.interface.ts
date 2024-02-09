import { DocumentType } from '@typegoose/typegoose';
import { FacilityDTO } from './facility.dto.js';
import { FacilityEntity } from './facility.model.js';

export interface IFacilityService {
  create(dto: FacilityDTO): Promise<DocumentType<FacilityEntity>>;
  findById(id: string): Promise<DocumentType<FacilityEntity> | null>;
  findByName(name: string): Promise<DocumentType<FacilityEntity> | null>;
  findOrCreate(dto: FacilityDTO): Promise<DocumentType<FacilityEntity>>;
}
