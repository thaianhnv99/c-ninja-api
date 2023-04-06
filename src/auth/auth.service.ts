import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private account;

  setAccount(account: any) {
    this.account = account;
  }

  login() {}

  signup() {}
}
