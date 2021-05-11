import http from "./Http";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("image", file);

    return http.post("/api/ocr", formData, {
      headers: {
        "Content-Type": false,
        "Process-Data": false,
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
