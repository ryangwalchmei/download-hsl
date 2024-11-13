import { downloadHSL } from '../../src/robot/downloadHSL';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url, outputFilename } = req.body;

    res.setHeader('Content-Type', 'video/mp4'); // Defina o tipo de conteúdo conforme o formato do vídeo
    res.setHeader('Content-Disposition', `attachment; filename="${outputFilename}"`); // Força o download

    try {
      // Chama a função para baixar o vídeo e streamizar para o cliente
      await downloadHSL(url, outputFilename, res);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
