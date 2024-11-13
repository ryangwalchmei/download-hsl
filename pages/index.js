import { useState } from 'react';
import SearchBar from "../src/components/searchBar";

import Image from "next/image";

import { FaFolder, FaPlay, FaCheck } from "react-icons/fa";

import image1 from "../public/assets/img/image 1.png";
import Button from "../src/components/button";
import { downloadHSL } from '../src/robot/downloadHSL';
import dynamic from 'next/dynamic';

export default function Index() {
  const [nameFile, setNameFile] = useState('');
  const [urlVideoInput, setUrlVideoInput] = useState('');
  const [urlVideoOutput, setUrlVideoOutput] = useState('');

  async function Download() {
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: urlVideoInput,
          outputFilename: 'video.mp4'
        })
      });

      if (response.ok) {
        const blob = await response.blob();  // Converte a resposta em um Blob
        const url = window.URL.createObjectURL(blob); // Cria um URL do Blob
        const a = document.createElement('a'); // Cria um link temporário
        a.href = url;
        a.download = 'video.mp4'; // O nome do arquivo que será baixado
        a.click();  // Dispara o download
        window.URL.revokeObjectURL(url);  // Libera a URL criada
      } else {
        console.error('Erro no download:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao fazer o download:', error);
    }
  }



  return (
    <div className="containermain">
      <div className="container">
        <div className="search">
          <SearchBar
            text="Nome do Vídeo"
            state={nameFile}
            setState={setNameFile}
          />
          <SearchBar
            text="Cole o link do vídeo"
            state={urlVideoInput} // Corrigido o erro de digitação: 'tate' para 'state'
            setState={setUrlVideoInput}
          />
          <Button onClick={Download}>Download</Button>
        </div>
        <div className="content">
          <div className="recentContentDownloaded">
            <div className="scrollableListDialog">
              <div className="contentScrollableListDialog">
                <div className="textContentScrollableListDialog">
                  <h3>Transferido recentemente</h3>
                </div>
                <div className="listContainerContentScrollableListDialog">
                  <div className="listgroupContainerContent">
                    <div className="listItem">
                      <div className="stateLayer">
                        <div className="videoinfodataBox">
                          <div className="leadingElement">
                            <div className="imageBox">
                              <div className="imageVideoPreview">
                                <Image
                                  src={image1}
                                  width="20px"
                                  height="10px"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="ContentListElement">
                            <div className="titleVideoPreview">
                              Algoritmo de Ordenação - Merge Sort - C++
                            </div>
                          </div>
                        </div>

                        <div className="optionsTrailingElement">
                          <FaFolder />
                          <FaPlay />
                          <FaCheck />
                        </div>
                      </div>
                      <div className="horizontalMiddle-inset">
                        <div className="divider"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="actions">
                <Button>Excluir</Button>
              </div>
            </div>
          </div>
          <div className="viewVideoSelected">
            {urlVideoOutput && (
              <video controls width="850" height="430" alt="">
                <source src={urlVideoOutput} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
