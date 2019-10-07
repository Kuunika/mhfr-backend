
import {HttpException, HttpStatus } from '@nestjs/common';

export class FacilityNotFoundException extends HttpException {
    constructor(facility_code: string) {
      super({
        message: `Facility with code ${facility_code}, does not exist`,
        code: '404',
      }, HttpStatus.NOT_FOUND);
    }
}