import { Response } from 'express';
import { S3Service } from '@/services/s3.service';
import { Authenticate } from '@/modules/auth';
import { Authorized } from '../middlewares/auth.middleware';
import { Res } from '@tsed/common';
import { Controller, Inject } from '@tsed/di';
import { QueryParams, PathParams, BodyParams } from '@tsed/platform-params';
import { Get, Post } from '@tsed/schema';

@Controller('/s3')
export class AwsController {
  @Inject() s3Service: S3Service;

  @Get('/file/:key*')
  async sign(
    @QueryParams('attachment') attachment: boolean,
    @QueryParams('fileName') fileName: string,
    @PathParams() allParams: any,
    @Res() res: Response,
  ) {
    const url = await this.s3Service.sign(allParams, fileName, attachment);
    res.redirect(url);
  }

  @Get('/generate-policy')
  @Authorized(Authenticate())
  async generatePolicy(
    @QueryParams('folder') folder: string,
    @QueryParams('contentType') contentType: string,
    @QueryParams('fileName') fileName: string,
  ) {
    return await this.s3Service.generatePolicy(folder, contentType, fileName);
  }

  @Post('/:folder/upload')
  async upload(@PathParams('folder') folder: string, @BodyParams('UploadFiles') file: any) {
    return await this.s3Service.upload(folder, file);
  }
}
