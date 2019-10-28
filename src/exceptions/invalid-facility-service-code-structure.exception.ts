import {HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFacilityServiceCodeStructureException extends HttpException {
    constructor() {
      super({
        message: `Invalid Payload Structure for Facility Service Codes`,
        code: '400',
      }, HttpStatus.BAD_REQUEST);
    }
}
