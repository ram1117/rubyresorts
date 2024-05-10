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
    return await this.model.findOne(filterQuery).lean<TDocument>(true);
  }

  async findMany() {
    return await this.model.find();
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
    const document = await this.model.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!document) {
      console.error('Document with given ID not found');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findAndDeleteById(_id: string) {
    return await this.findAndDeleteById(_id);
  }

  async deleteMany() {
    return await this.deleteMany();
  }
}
