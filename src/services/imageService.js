import bucket from '../firebase/firebase.js';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      console.error('Erro no upload:', err);
      reject(new Error('Erro no upload.'));
    });

    blobStream.on('finish', async () => {
      try {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
        resolve(publicUrl);
      } catch (error) {
        reject(new Error('Erro ao gerar a URL pública.'));
      }
    });

    // Finalizando o upload
    blobStream.end(file.buffer);
  });
}
