import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super({ success: false, status, message, data: null }, status);
  }

  static badRequest(message: string) {
    return new BaseException(message, HttpStatus.BAD_REQUEST);
  }

  static notFound(message: string) {
    return new BaseException(message, HttpStatus.NOT_FOUND);
  }

  static internal(message: string) {
    return new BaseException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
