import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomTypeRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepo: RoomTypeRepository) {}

  create(createRoomDto: CreateRoomDto) {
    return this.roomsRepo.create(createRoomDto);
  }

  findAll() {
    return this.roomsRepo.findMany();
  }

  findOne(id: string) {
    return this.roomsRepo.findById(id);
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomsRepo.findAndUpdateById(id, updateRoomDto);
  }

  remove(id: string) {
    return this.roomsRepo.findAndDeleteById(id);
  }
}
