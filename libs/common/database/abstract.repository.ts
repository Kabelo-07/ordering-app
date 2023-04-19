import { Logger, NotFoundException } from "@nestjs/common";
import { Connection, FilterQuery, Model, SaveOptions, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "./abstract.schema";


export abstract class AbstractRepository<T extends AbstractDocument> {

    protected abstract readonly logger:Logger;

    constructor(
        protected readonly model: Model<T>,
        private readonly connection: Connection
        ) {}

    async create(document: Omit<T, '_id'>, options?: SaveOptions): Promise<T> {
        const entity = new this.model({
            ...document,
            _id: new Types.ObjectId
        });

        return (
            await entity.save(options)
        ).toJSON() as unknown as T;
    }

    async findOne(filterQuery: FilterQuery<T>): Promise<T> {
         const entity = await this.model.findOne(filterQuery, {}, { lean: true });

         if (!entity) {
             this.logger.warn('Document not found with filterQuery {}', filterQuery);
             throw new NotFoundException('Document not found');
         }

         return entity;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<T>, document: UpdateQuery<T>): Promise<T> {
        const entity = await this.model.findOneAndUpdate(filterQuery, document, {
            new: true,
            lean: true
        });

        if (!entity) {
            this.logger.warn('Document not found with filterQuery {}', filterQuery);
            throw new NotFoundException('Document not found');
        }

        return entity;
    }

    async upsert(filterQuery: FilterQuery<T>, document: Partial<T>): Promise<T> {
        const entity = await this.model.findOneAndUpdate(filterQuery, document, {
            new: true,
            lean: true,
            upsert: true
        });

        return entity;
    }
    
    async find(filterQuery: FilterQuery<T>): Promise<T[]> {
        return this.model.find(filterQuery, {}, { lean: true });
    }

    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }

}