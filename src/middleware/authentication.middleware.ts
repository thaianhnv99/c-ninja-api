import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { RequestService } from 'src/request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);

  constructor(private readonly requestService: RequestService) {}
  use(req: Request, res: Response, next: () => void) {
    this.logger.log(AuthenticationMiddleware.name);

    console.log(this.requestService);
    // Authencation the request
    const userId = '123';
    this.requestService.setUserId(userId);

    next();
  }
}
