import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { SERVICE_NAMES, SERVICE_PATTERNS } from '../constants';

export class AppJwtAuthGuard implements CanActivate {
  constructor(@Inject(SERVICE_NAMES.AUTH) private authService: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const auth = context.switchToHttp().getRequest().cookies?.Authentication;
    const refresh = context.switchToHttp().getRequest().cookies?.Refresh;

    if (!auth && !refresh) throw new UnauthorizedException('Please Login');

    return this.authService
      .send({ cmd: SERVICE_PATTERNS.AUTH }, { Authentication: auth })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
