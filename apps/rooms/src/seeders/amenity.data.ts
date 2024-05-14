import { Types } from 'mongoose';

export const AmenitiesData = [
  {
    _id: new Types.ObjectId(),
    amenity_code: 1,
    name: 'Free Wi-Fi',
  },
  { _id: new Types.ObjectId(), amenity_code: 2, name: 'Swimming Pool' },
  { _id: new Types.ObjectId(), amenity_code: 3, name: 'Fitness Center' },
  { _id: new Types.ObjectId(), amenity_code: 4, name: 'Air Conditioning' },
  { _id: new Types.ObjectId(), amenity_code: 5, name: 'Daily Housekeeping' },
  { _id: new Types.ObjectId(), amenity_code: 6, name: 'Room Service' },
  { _id: new Types.ObjectId(), amenity_code: 7, name: 'Spa' },
  { _id: new Types.ObjectId(), amenity_code: 8, name: 'Concierge Service' },
  { _id: new Types.ObjectId(), amenity_code: 9, name: 'Laundry Service' },
  { _id: new Types.ObjectId(), amenity_code: 10, name: 'Private Beach' },
  { _id: new Types.ObjectId(), amenity_code: 11, name: 'Butler Service' },
  { _id: new Types.ObjectId(), amenity_code: 12, name: 'Limousine Service' },
];
