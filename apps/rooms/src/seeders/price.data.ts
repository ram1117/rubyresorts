import { Types } from 'mongoose';

export const PriceData = [
  {
    _id: new Types.ObjectId(),
    baserate: 80,
    tax: 18,
    room_name: 'Standard Room',
  },
  {
    _id: new Types.ObjectId(),
    baserate: 120,
    tax: 18,
    room_name: 'Deluxe Room',
  },
  { _id: new Types.ObjectId(), baserate: 200, tax: 18, room_name: 'Suite' },
  {
    _id: new Types.ObjectId(),
    baserate: 450,
    tax: 18,
    room_name: 'Beachfront Villa',
  },
  { _id: new Types.ObjectId(), baserate: 320, tax: 18, room_name: 'Penthouse' },
];
