import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
  const { m3u8Url, nameFile } = req.query;

  // Verifica se a URL está presente
  if (!m3u8Url) {
    res.status(400).json({ error: 'A URL .m3u8 é necessária' });
    return;
  }

  // Verifica se o nome do arquivo está presente
  if (!nameFile) {
    res.status(400).json({ error: 'O nome do arquivo é necessário' });
    return;
  }

  try {
    // Define o caminho temporário para armazenar o vídeo consolidado
    const outputFilePath = path.resolve('./public', `${nameFile}.mp4`);

    // Comando ffmpeg para baixar e consolidar o vídeo
    const ffmpegCommand = `ffmpeg -i "${m3u8Url}" -c:v copy -c:a copy -bsf:a aac_adtstoasc "${outputFilePath}"`;

    // Executa o comando
    await execPromise(ffmpegCommand);

    // Envia o arquivo consolidado para o usuário
    res.setHeader('Content-Disposition', `attachment; filename="${nameFile}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');

    const videoStream = fs.createReadStream(outputFilePath);
    videoStream.pipe(res);

    videoStream.on('end', () => {
      // Remove o arquivo temporário após o download
      fs.unlink(outputFilePath, (err) => {
        if (err) console.error('Erro ao deletar o arquivo:', err);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao consolidar e baixar o vídeo' });
  }
}
