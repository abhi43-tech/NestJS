import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { PaginationDto } from "./paginate.dto";
import { PaginateResDto } from "./response.dto";

@Injectable()
export class PaginationService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public async paginateData(paginate: PaginationDto): Promise<PaginateResDto<User>>  {
    const { page, pageSize } = paginate;
    const skip = (page - 1) * pageSize;

    const total = await this.userRepo.count();

    const data = await this.userRepo.find({
      skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      totalPages,
      page,
      pageSize,
    }
  }
}