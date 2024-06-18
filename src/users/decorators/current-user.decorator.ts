import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';

// cannot reach into the DI with param decorators (i.e. cannot access UserService)
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => { // context -> wrapper around incoming request / ExecutionContext -> abstract a https req, GRPC, websockets...
    const request = context.switchToHttp().getRequest();

    return {
      id: request.session.userId,
      email: request.session.email
    };
  }
)