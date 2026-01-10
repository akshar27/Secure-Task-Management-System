import { Controller, Get } from '@nestjs/common';

@Controller() // 👈 ROOT controller
export class AppController {
  @Get()
  getRoot() {
    return { message: 'API is working' };
  }
}
