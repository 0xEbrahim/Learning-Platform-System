import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config/env";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRETS,
});

export default async function (
  path: string,
  folder: string
): Promise<void | UploadApiResponse> {
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      folder,
    })
    .catch((error) => {
      console.log(error);
    });
  uploadResult;
}
