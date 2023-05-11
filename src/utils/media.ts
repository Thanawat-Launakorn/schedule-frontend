import type { RcFile } from "antd/es/upload/interface";
import Resizer from "react-image-file-resizer";

export const fileToDataUrl = (file: File | RcFile) =>
  new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const resizeImageFileSize = async ({
  maxHeight = 200,
  maxWidth = 200,
  file,
}: {
  maxWidth?: number;
  maxHeight?: number;
  file: File;
}) =>
  new Promise<File | string | Blob | ProgressEvent<FileReader>>((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
