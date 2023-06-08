import {Injectable} from "@nestjs/common";
import {BrandsService} from "../api/v1/brands/brands.service";

@Injectable()
export class FakeProductsMakerService {

    constructor (private brandService: BrandsService) {

    }

    async make (amount: number) {
        const brands = await this.brandService.getAll({ limit: 100 });

    }

}