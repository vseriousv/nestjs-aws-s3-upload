import { Logger, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { StorageService } from '../storage/storage.service';

@Module({
  providers: [ArticlesService, StorageService, Logger],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
