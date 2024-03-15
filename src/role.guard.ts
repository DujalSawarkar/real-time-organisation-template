import { CanActivate } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  constructor(private readonly role: string) {}
  canActivate(context: any) {
    console.log('this.role', this.role);
    const user = context.switchToHttp().getRequest().user.user;
    console.log('context.user.role', user.role);
    return user.role === this.role;
  }
}
