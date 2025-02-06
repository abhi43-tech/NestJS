
import { Exclude, Expose, Transform } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  @Expose()
  get fullName() {
    return `${this.firstName}  ${this.lastName}`
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
