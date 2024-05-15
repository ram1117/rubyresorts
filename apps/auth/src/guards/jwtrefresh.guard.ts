import { AuthGuard } from '@nestjs/passport';

export class JwtRefreshGuard extends AuthGuard('rt-jwt') {}
