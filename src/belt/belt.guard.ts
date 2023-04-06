import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  private readonly logger = new Logger(BeltGuard.name);
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Validate request
    // const hasBlackBelt = request.user.belts.includes('black');

    this.logger.log(BeltGuard.name);
    return true;
  }
}
