import { Injectable, HttpException } from '@nestjs/common';
import * as Joi from '@hapi/joi';

@Injectable()
export class JoiDtoValidatorHelper {

    // TODO: See if there is a way to type the params.
    // TODO: Add functionality to explicitly state what part of the payload is invalid
    public validateDto(validationSchema: any, dto: any, exceptionThrownIfFail: HttpException) {
        const validation = Joi.validate(dto, validationSchema);

        if (validation.error) {
            throw exceptionThrownIfFail;
        }
    }
}
