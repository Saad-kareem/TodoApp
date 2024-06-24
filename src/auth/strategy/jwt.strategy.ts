import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

@Injectable()
export class JwtStrategys extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      ignoreExpiration: false,
      secretOrkey: configService.get('JWT_KEY'),
    });
  }
  async validate(payload: any) {
    return {
      userId: payload.id,
      firstname: payload.firstName,
      lastname: payload.lastName,
      email: payload.email,
      role: payload.role,
    };
  }
}
