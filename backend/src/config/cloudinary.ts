import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from "../config/env";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRETS,
});

export default async function (
  path: string,
  public_id: string
): Promise<void | UploadApiResponse> {

    const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id,
    })
    .catch((error) => {
      console.log(error);
    });

  //   console.log(uploadResult);

  //   const optimizeUrl = cloudinary.url("shoes", {
  //     fetch_format: "auto",
  //     quality: "auto",
  //   });

  //   console.log(optimizeUrl);

  //   const autoCropUrl = cloudinary.url("shoes", {
  //     crop: "auto",
  //     gravity: "auto",
  //     width: 500,
  //     height: 500,
  //   });

  //   console.log(autoCropUrl);
  uploadResult;
}
