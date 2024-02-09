import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { EComponentInterface } from '../../shared/const/index.js';
import type { ILogger } from '../../shared/lib/index.js';
import type { ICityService } from './city.service.interface.js';
import { CityEntity } from './city.model.js';
import { CityDTO } from './city.dto.js';

@injectable()
export class CityService implements ICityService {
  constructor(
    @inject(EComponentInterface.ILogger) private readonly _logger: ILogger,
    @inject(EComponentInterface.ICityModel) private readonly _cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CityDTO): Promise<DocumentType<CityEntity>> {
    const response = await this._cityModel.create(dto);
    this._logger.info(`New facility "${dto.name}" was created`);

    return response;
  }

  public async findById(id: string): Promise<DocumentType<CityEntity> | null> {
    return this._cityModel.findById(id);
  }

  public async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this._cityModel.findOne({name});
  }

  public async findOrCreate(dto: CityDTO): Promise<DocumentType<CityEntity>> {
    const response = await this.findByName(dto.name);

    if (response) {
      return response;
    }

    return this.create(dto);
  }
}
