import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(private readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    return await this.model.create(document);
  }

  async findById(_id: string): Promise<TDocument> {
    return await this.model.findById(_id).lean<TDocument>(true);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);
    return document;
  }

  async findMany() {
    return await this.model.find().lean<TDocument>(true);
  }

  async findManySorted(sortBy: any) {
    return await this.model.find().sort(sortBy).lean<TDocument>(true);
  }

  async findOneByFilter(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return await this.model.findOne(filterQuery);
  }

  async findManyByFilter(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument[]> {
    return await this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findAndUpdateById(
    _id: string,
    updateData: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findByIdAndUpdate(_id, updateData, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      console.error('Document with given ID not found');
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async updateMany(
    filterQuery: FilterQuery<TDocument>,
    updateData: UpdateQuery<TDocument>,
  ): Promise<TDocument[]> {
    return await this.model
      .updateMany(filterQuery, updateData)
      .lean<TDocument[]>();
  }

  async findAndDeleteById(_id: string) {
    return await this.findAndDeleteById(_id).lean<TDocument>(true);
  }

  async deleteMany() {
    return await this.deleteMany().lean<TDocument>(true);
  }
}
