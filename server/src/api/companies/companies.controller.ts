import {
    Body,
    Controller, Delete,
    Get,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes
} from "@nestjs/common";
import {AccessTokenGuard} from "../../guards/access-token-guard.service";
import {IUserVerifiedData, UserVerified} from "../../decorators/user-verified.decorator";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CompaniesService} from "./companies.service";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {CompanyAccessService} from "../company-access/company-access.service";

@Controller('/api/companies')
export class CompaniesController {

    constructor(private companiesService: CompaniesService,
                private companyAccessService: CompanyAccessService) {}

    @Post('/create')
    @UseGuards(AccessTokenGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(new (FileFieldsInterceptor([
        { name: 'icon', maxCount: 1 }
    ])))
    create (@UserVerified() user: IUserVerifiedData,
            @Body() createCompanyDto: CreateCompanyDto,
            @UploadedFiles() files: { [key: string]: Express.Multer.File[] }) {
        return this.companiesService.create({ ...createCompanyDto, icon: files['icon'][0] }, user.id)
    }

    @Delete('/delete')
    @UseGuards(AccessTokenGuard)
    delete (@UserVerified() user: IUserVerifiedData,
            @Body() body: { title: string }) {
        return this.companiesService.delete(user.id, body.title);
    }

    @Get('/my')
    @UseGuards(AccessTokenGuard)
    getMy (@UserVerified() user: IUserVerifiedData,
           @Query('limit') limit: number = 10,
           @Query('offset') offset: number = 0,
           @Query('sort') sort: string = '') {
        return this.companiesService.getAllByUser(user.id, { limit: Number(limit), offset: Number(offset), sort: sort.split(',')});
    }

    @Get('/getFullByTitle')
    @UseGuards(AccessTokenGuard)
    getFullByTitle (@UserVerified() user: IUserVerifiedData,
                    @Query('title') title: string) {
        return this.companiesService.getFullOneByTitle(user.id, title);
    }

    /**
     * Либо убрать либо переделать под админа в будущем
     * @param user
     * @param limit
     * @param offset
     * @param sort
     */
    @Get('/getByAccess')
    @UseGuards(AccessTokenGuard)
    getByAccess(@UserVerified() user: IUserVerifiedData,
                @Query('limit') limit: number = 10,
                @Query('offset') offset: number = 0,
                @Query('sort') sort: string = '') {
        return this.companiesService.getAllByUser(user.id, { limit: Number(limit), offset: Number(offset), sort: sort.split(',')});
    }

}