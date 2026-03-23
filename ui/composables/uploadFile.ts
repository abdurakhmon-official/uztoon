type UploadResult = { removeAuthKey: string; key: string; url: string };

export function uploadFile(file: File, folder: string): Promise<UploadResult> {
  const { $toast } = useNuxtApp();

  return new Promise((resolve, reject) => {
    const fileNamePrefix = fileNamePrefixer(file);

    generatePolicy(file.name, folder, file.type, fileNamePrefix)
      .then((data: any) => {
        if (!data) {
          return;
        }

        const formData: FormData = new FormData();
        Object.keys(data.policy).forEach((k) => {
          formData.set(k, data.policy[k]);
        });

        formData.append("file", file);
        formData.append("Content-Type", file.type);

        fetch(
          `https://${data.policy.bucket}.s3.${data.region}.amazonaws.com/`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then(() => {
            resolve({
              url: data.url,
              removeAuthKey: data.removeAuthKey,
              key: data.policy.key,
            });
          })
          .catch((err: Error) => {
            if (err) {
              $toast.error(err.message || "Failed to upload the file!");
              console.log(err);
              reject(err);
            }
          });
      })
      .catch((error: Error) => {
        if (error) {
          $toast.error(error.message || "Oops, we have a problem!");
          console.error("Promise rejected with error: " + error);
          reject(error);
        }
      });
  });
}

function fileNamePrefixer(file: File) {
  return file.name;
}

function generatePolicy(
  fileName: string,
  folder: string,
  contentType: string,
  fileNamePrefix: string
) {
  return useCustomFetch("/s3/generate-policy", {
    method: "GET",
    params: {
      fileName: encodeURIComponent(fileName),
      folder: encodeURIComponent(folder),
      prefix: fileNamePrefix,
      contentType: encodeURIComponent(contentType),
    },
  });
}
