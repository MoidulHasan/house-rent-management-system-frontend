import AWS from "aws-sdk";
import fs from "fs";
import formidable from "formidable";

export default defineEventHandler(async (event) => {
  try {
    const files = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: false });

      form.parse(event.req, (err, _fields, files) => {
        if (err) reject(err);

        resolve(files);
      });
    });

    const config = useRuntimeConfig();

    const s3 = new AWS.S3();

    s3.config.update({
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    });

    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const imageName =
      "images/uploads/" + timestamp + "-" + files.image.originalFilename.trim();

    const imagePath = files.image.filepath;
    const blob = fs.readFileSync(imagePath);

    const uploadedImage = await s3
      .upload({
        Bucket: config.awsBucketName,
        Key: imageName,
        Body: blob,
        ContentType: "image/jpeg",
        ACL: "public-read",
      })
      .promise();

    if (uploadedImage.Location) {
      const response = JSON.stringify({
        success: true,
        message: "Image upload successfull",
        data: {
          url: uploadedImage.Location,
        },
      });

      return response;
    } else {
      const response = JSON.stringify({
        success: false,
        message: "Image upload failed",
      });

      return response;
    }
  } catch (err) {
    const response = JSON.stringify({
      success: false,
      message: "Image upload failed",
      error: err,
    });

    return response;
  }
});
