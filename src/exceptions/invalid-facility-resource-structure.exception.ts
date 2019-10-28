import {HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFacilityResourcesStructureException extends HttpException {
    constructor() {
      super({
        message: `Invalid Payload Structure for Facility Resources`,
        code: '400',
      }, HttpStatus.BAD_REQUEST);
    }
}