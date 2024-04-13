import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import * as mime from 'mime-types';

@Injectable()
export class StorageService {
  private s3: S3;
  constructor(private configService: ConfigService, private logger: Logger) {
    this.s3 = new S3({
      region: 'eu-central-1',
      credentials: {
        accessKeyId: configService.get('aws.key'),
        secretAccessKey: configService.get('aws.secret'),
      },
    });
  }

  async uploadFile(bucketName: string, key: string, file: Buffer) {
    const putObj = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: mime.lookup(key),
    });

    try {
      await this.s3.send(putObj);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('ERROR with storage');
    }
  }
}
