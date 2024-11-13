// utils/downloadHSL.js
import path from 'path';

// O 'fs' deve ser importado dentro do arquivo, mas só será executado no servidor
let fs;
let ffmpeg;

import { Readable } from 'stream';

if (typeof window === 'undefined') {
  fs = require('fs');
  ffmpeg = require('fluent-ffmpeg');
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  const ffprobePath = require('@ffprobe-installer/ffprobe').path;

  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
}

export async function downloadHSL(url, outputFilename, res) {
  return new Promise((resolve, reject) => {
    // Checar se está no servidor
    if (!fs || !ffmpeg) {
      reject(new Error('Este código só pode ser executado no lado do servidor'));
      return;
    }

    // const outputPath = path.join(process.cwd(), 'downloads', outputFilename);

    // Configura o comando FFmpeg
    const ffmpegStream = ffmpeg(url)  // Passa diretamente a URL de entrada
      .outputOptions([  // Defina as opções de saída
        '-c:v', 'copy',  // Copia o codec de vídeo
        '-c:a', 'copy',  // Copia o codec de áudio
        '-bsf:a', 'aac_adtstoasc',  // Ajusta o áudio para AAC
        '-protocol_whitelist', 'file,http,https,tls,crypto'  // Permite protocolos necessários
      ])
      .format('mp4')
      .pipe(res, { end: true }); // Salva o arquivo no caminho especificado

    ffmpegStream.on('end', () => {
      console.log("Download Concluído");
    });

    ffmpegStream.on('error', (err) => {
      console.error('Erro ao processar vídeo:', err);
      res.status(500).send('Erro ao processar vídeo');
    });

  });
}
