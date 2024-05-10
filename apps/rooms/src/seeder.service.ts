import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomTypeDocument } from './model/room_type.model';
import { Model } from 'mongoose';
import { AmenityDocument } from './model/amenity.model';
import { AmenitiesData, RoomTypesData, PriceData } from './seeders';
import { PriceDocument } from './model/price.model';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(RoomTypeDocument.name)
    private roomtypeModel: Model<RoomTypeDocument>,
    @InjectModel(AmenityDocument.name)
    private amenityModel: Model<AmenityDocument>,
    @InjectModel(PriceDocument.name)
    private priceModel: Model<PriceDocument>,
  ) {}

  async onApplicationBootstrap() {
    console.log('Seeding rooms and associated data');
    console.log('********************');
    this.roomtypeModel.collection.deleteMany();
    this.amenityModel.collection.deleteMany();
    this.priceModel.collection.deleteMany();

    const amenities = await this.amenityModel.create(AmenitiesData);
    const prices = await this.priceModel.create(PriceData);

    RoomTypesData.forEach(async (room) => {
      const roomAmenities = amenities.filter((amenity) =>
        room.amenity_codes.includes(amenity.amenity_code),
      );

      const price = prices.find(
        (priceItem) => priceItem.room_name === room.name,
      );
      this.roomtypeModel.create({
        ...room,
        amenities: roomAmenities,
        price: price,
      });
    });

    console.log(`${amenities.length} amenities seeded`);
    console.log(`${RoomTypesData.length} room types seeded`);
  }
}
