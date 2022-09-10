import upload from '@config/upload';
import fs from 'fs';
import { S3 } from 'aws-sdk';
import mime from 'mime';
import { resolve } from 'path';
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;
  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,

    });
  }
  async save(file: string, folder: string): Promise<string> {
    const originalFileName = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalFileName);
    const contentType = mime.getType(originalFileName);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType: contentType
    }).promise();

    await fs.promises.unlink(originalFileName);
    return file;
  };

  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file,
    }).promise();
  };

};

export { S3StorageProvider };