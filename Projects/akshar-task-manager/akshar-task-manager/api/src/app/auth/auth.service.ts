import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // TEMP in-memory users (acceptable for challenge if documented)
  private users = [
    {
      id: 1,
      email: 'admin@test.com',
      passwordHash: bcrypt.hashSync('password', 10),
      role: 'ADMIN',
      organizationId: 1,
    },
    {
      id: 2,
      email: 'viewer@test.com',
      passwordHash: bcrypt.hashSync('password', 10),
      role: 'VIEWER',
      organizationId: 1,
    },
  ];

  async login(email: string, password: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      orgId: user.organizationId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
