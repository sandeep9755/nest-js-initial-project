import { Repository, DeepPartial } from 'typeorm';
import { BaseException } from '../exceptions/base.exception';

export class BaseService<T extends { id: number }> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    const results = await this.repository.find();
    if (!results.length) throw BaseException.notFound('No records found');
    return results;
  }

  async findById(id: number): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw BaseException.notFound(`Record not found with ID: ${id}`);
    return entity;
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findById(id);
    Object.assign(entity, data);
    return await this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findById(id);
    await this.repository.remove(entity);
  }
}
