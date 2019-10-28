import {HttpException, HttpStatus } from '@nestjs/common';

export class InvalidDtoIdsException extends HttpException {
    constructor(message: string = 'Invalid IDs Passed', duplicateIds: number[], nonExistingIds: number[]) {
      super({
        message,
        duplicateIds,
        nonExistingIds,
        code: '400',
      }, HttpStatus.NOT_FOUND);
    }
}