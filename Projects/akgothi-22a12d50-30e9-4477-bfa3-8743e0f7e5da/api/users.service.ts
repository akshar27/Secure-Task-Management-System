import { Injectable } from '@nestjs/common'; // 👈 ADD THIS LINE

@Injectable()
export class UsersService {
  private users: any[] = [];

  findAll() {
    return this.users;
  }

  create(user: { name: string }) {
    const newUser = { id: Date.now(), ...user };
    this.users.push(newUser);
    return newUser;
  }
}
