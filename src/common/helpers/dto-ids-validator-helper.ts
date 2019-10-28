import { Injectable, HttpException } from '@nestjs/common';
import { InvalidDtoIdsException } from '../../exceptions/invalid-dto-ids.exception';

@Injectable()
export class DtoIdsValidatorHelper {
    public async filterIdsFromDto(idsFromDto: number[], allItemsInCategory: number[],
                                  allExistingItemsForEntity: number[], errorMessageForThrownException: string): Promise<DtoIdsValidatorReturnObject>{

        const duplicateEntities = await this.findDuplicateEntities(allExistingItemsForEntity, idsFromDto);
        const nonExistingEntities = await this.findNonExistingEntities(allItemsInCategory, idsFromDto);
        const validEntitiesFromDto = await this.filterDuplicateEntities(allExistingItemsForEntity, 
                                                            await this.filterExistingEntities(allItemsInCategory, idsFromDto));

        if (validEntitiesFromDto.length === 0) {
            throw new InvalidDtoIdsException(errorMessageForThrownException, duplicateEntities, nonExistingEntities);
        }

        return {
            duplicateEntities,
            nonExistingEntities,
            validEntitiesFromDto,
        };
    }

    private async findDuplicateEntities(existingIds: number[], idsFromDto: number[]): Promise<number[]> {
        return idsFromDto.filter(id => existingIds.includes(id));
    }

    private async findNonExistingEntities(allItemsInCategory: number[], idsFromDto: number[]): Promise<number[]> {
        return idsFromDto.filter(serviceId => !allItemsInCategory.includes(serviceId));
    }

    private async filterDuplicateEntities(existingIds: number[], idsFromDto: number[]): Promise<number[]> {
        return idsFromDto.filter(id => !existingIds.includes(id));
    }

    private async filterExistingEntities(allExistingIds: number[], idsFromDto: number[]): Promise<number[]> {
        return idsFromDto.filter(serviceId => allExistingIds.includes(serviceId));
    }
}

export interface DtoIdsValidatorReturnObject {
    duplicateEntities: number[];
    nonExistingEntities: number[];
    validEntitiesFromDto: number[];
}
