import { useState } from 'react';
import SearchBar from "../src/components/searchBar";
import Image from "next/image";
import { FaFolder, FaPlay, FaCheck } from "react-icons/fa";
import image1 from "../public/assets/img/image 1.png";
import Button from "../src/components/button";

export default function Index() {
  const [nameFile, setNameFile] = useState('');
  const [urlVideoInput, setUrlVideoInput] = useState('');
  const [urlVideoOutput, setUrlVideoOutput] = useState('');

  const downloadVideo = async () => {
    const m3u8Url = urlVideoInput;
    const response = await fetch(`/api/download?m3u8Url=${encodeURIComponent(m3u8Url)}&nameFile=${nameFile}`);

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${nameFile}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setUrlVideoOutput(url);  // Atualiza a URL para visualização do vídeo baixado
    } else {
      alert('Erro ao fazer o download do vídeo');
    }
  };

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
            state={urlVideoInput}
            setState={setUrlVideoInput}
          />
          <Button onClick={downloadVideo}>Download</Button>
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
              <video controls width="850" height="430">
                <source src={urlVideoOutput} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
