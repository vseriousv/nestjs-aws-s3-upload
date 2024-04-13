import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: null }))
  createArticle(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateArticleDto,
  ) {
    return this.service.createArticle(data, file);
  }
}
