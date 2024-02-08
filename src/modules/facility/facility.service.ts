import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { EComponentInterface } from '../../shared/const/index.js';
import type { ILogger } from '../../shared/lib/index.js';
import type { IFacilityService } from './facility.service.interface.js';
import { FacilityEntity } from './facility.model.js';
import { FacilityDTO } from './facility.dto.js';

@injectable()
export class FacilityService implements IFacilityService {
  constructor(
    @inject(EComponentInterface.ILogger) private readonly _logger: ILogger,
    @inject(EComponentInterface.IFacilityModel) private readonly _facilityModel: types.ModelType<FacilityEntity>
  ) {}

  public async create(dto: FacilityDTO): Promise<DocumentType<FacilityEntity>> {
    const response = await this._facilityModel.create(dto);
    this._logger.info(`New facility "${dto.name}" was created`);

    return response;
  }

  public async findById(id: string): Promise<DocumentType<FacilityEntity> | null> {
    return this._facilityModel.findById(id);
  }

  public async findByName(name: string): Promise<DocumentType<FacilityEntity> | null> {
    return this._facilityModel.findOne({name});
  }

  public async findOrCreate(dto: FacilityDTO): Promise<DocumentType<FacilityEntity>> {
    const response = await this.findByName(dto.name);

    if (response) {
      return response;
    }

    return this.create(dto);
  }
}
