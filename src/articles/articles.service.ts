import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ConfigService } from '@nestjs/config';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
@Injectable()
export class ArticlesService {
  constructor(
    private readonly configService: ConfigService,
    private readonly storage: StorageService,
  ) {}
  async createArticle(data: CreateArticleDto, file: Express.Multer.File) {
    const bucket = this.configService.get('aws.s3Bucket');
    const fileName = `${uuidv4()}${extname(file.originalname)}`;
    const key = `articles/files/${fileName}`;
    await this.storage.uploadFile(bucket, key, file.buffer);

    return `https://${bucket}/${key}`;
  }
}
