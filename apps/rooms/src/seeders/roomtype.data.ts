import { Types } from 'mongoose';

export const RoomTypesData = [
  {
    _id: new Types.ObjectId(),
    name: 'Standard Room',
    description:
      'Comfortable room with basic amenities suitable for solo travelers or couples.',
    total: 30,
    amenity_codes: [1, 2, 3, 4],
    order: 5,
    images: [
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/basic/basic1.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/basic/basic2.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/basic/basic3.jpg',
    ],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Deluxe Room',
    description:
      'Spacious room with extra amenities and a beautiful view, ideal for families or those seeking luxury.',
    total: 20,
    amenity_codes: [1, 2, 3, 4, 5],
    order: 4,
    images: [
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/deluxe/deluxe1.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/deluxe/deluxe2.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/deluxe/deluxe3.jpg',
    ],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Suite',
    description:
      'Luxurious suite featuring separate living and sleeping areas, perfect for VIP guests or honeymooners.',
    total: 15,
    amenity_codes: [5, 6, 7, 8, 9, 10, 11, 12],
    order: 3,
    images: [
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/suites/suite1.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/suites/suiter2.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/suites/suite3.jpg',
    ],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Beachfront Villa',
    description:
      'Exclusive villa located right on the beach with private access, ideal for those who want ultimate privacy and luxury.',
    total: 10,
    amenity_codes: [5, 6, 7, 8, 9, 10, 11, 12],
    order: 1,
    images: [
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/villa/villa1.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/villa/villa2.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/villa/villa3.jpg',
    ],
  },
  {
    _id: new Types.ObjectId(),
    name: 'Penthouse',
    description:
      'Top-floor penthouse with panoramic views, private terrace, and deluxe amenities, perfect for special occasions or high-end travelers.',
    total: 4,
    amenity_codes: [5, 6, 7, 8, 9, 10, 11, 12],
    order: 2,
    images: [
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/penthouse/penthouse1.jpg?t=2024-05-11T09%3A29%3A22.758Z',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/penthouse/penthouse2.jpg',
      'https://ggcfapdcaehqbchzsfqh.supabase.co/storage/v1/object/public/ruby_resorts/penthouse/penthouse3.jpg',
    ],
  },
];
