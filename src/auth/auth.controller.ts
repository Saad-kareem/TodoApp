import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}
  @Post('/login')
  @UseGuards(AuthGuard('jwt'))
  login(@Req() req) {
    // JWT TOKEN
    const user: User = req.user;
    const payload = {
      userId: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
