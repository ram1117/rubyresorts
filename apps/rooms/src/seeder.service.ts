// import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { RoomTypeDocument } from '@app/shared/models/room_type.model';
// import { Model } from 'mongoose';
// import { AmenityDocument } from '../../../libs/shared/src/models/amenity.model';
// import { AmenitiesData, RoomTypesData, PriceData } from './seeders';
// import { PriceDocument } from '../../../libs/shared/src/models/price.model';
// import { RoomInventoryDocument } from '@app/shared/models/room_inventory.model';
// import { eachDayOfInterval, add } from 'date-fns';

// @Injectable()
// export class SeederService implements OnApplicationBootstrap {
//   private readonly logger = new Logger(SeederService.name);

//   constructor(
//     @InjectModel(RoomTypeDocument.name)
//     private roomtypeModel: Model<RoomTypeDocument>,
//     @InjectModel(AmenityDocument.name)
//     private amenityModel: Model<AmenityDocument>,
//     @InjectModel(PriceDocument.name)
//     private priceModel: Model<PriceDocument>,
//     @InjectModel(RoomInventoryDocument.name)
//     private roomInventoryModel: Model<RoomInventoryDocument>,
//   ) {}

//   async onApplicationBootstrap() {
//     this.logger.log('Seeding rooms and associated data');
//     this.logger.log('********************');
//     this.roomtypeModel.collection.deleteMany();
//     this.amenityModel.collection.deleteMany();
//     this.priceModel.collection.deleteMany();
//     this.roomInventoryModel.collection.deleteMany();
//     const amenities = await this.amenityModel.create(AmenitiesData);
//     const prices = await this.priceModel.create(PriceData);
//     RoomTypesData.forEach(async (room) => {
//       const roomAmenities = amenities.filter((amenity) =>
//         room.amenity_codes.includes(amenity.amenity_code),
//       );
//       const price = prices.find(
//         (priceItem) => priceItem.room_name === room.name,
//       );
//       const created_room = await this.roomtypeModel.create({
//         ...room,
//         amenities: roomAmenities,
//         price: price,
//       });
//       const fromDate = new Date();
//       const toDate = add(fromDate, { months: 5 });
//       toDate.setHours(12, 0, 0, 0);
//       const dates = eachDayOfInterval({ start: fromDate, end: toDate });
//       const inventoryData = dates.map((date) => ({
//         date,
//         available_rooms: created_room.total,
//         room_type: created_room._id,
//       }));
//       this.roomInventoryModel.create(inventoryData);
//     });
//     this.logger.log(`${amenities.length} amenities seeded`);
//     this.logger.log(`${RoomTypesData.length} room types seeded`);
//   }
// }
