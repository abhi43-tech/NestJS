
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    const requireRole = this.reflector.get(ROLES_KEY, context.getHandler()) 

    const userRole = request.body.role;

    if(requireRole !== userRole) return false;

    return true;
  }
}