import * as process from 'process';

export const configuration = () => ({
  aws: {
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    s3Bucket: process.env.AWS_S3_BUCKET,
  },
});
