import {
    Body,
    Controller,
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

@Controller('/api/companies')
export class CompaniesController {

    constructor(private companiesService: CompaniesService) {}

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

    @Get('/my')
    @UseGuards(AccessTokenGuard)
    getAllByUser (@UserVerified() user: IUserVerifiedData) {
        return this.companiesService.getAllByUser(user.id);
    }

    @Get('/getFullByTitle')
    @UseGuards(AccessTokenGuard)
    getFullByTitle (@UserVerified() user: IUserVerifiedData,
                    @Query('title') title: string) {
        return this.companiesService.getFullByTitle(user.id, title);
    }

}