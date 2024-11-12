import SearchBar from "../src/components/searchBar";

import Image from "next/image";

import { FaFolder, FaPlay, FaCheck } from "react-icons/fa";

import image1 from "../public/assets/img/image 1.png";

export default function Index() {
  return (
    <div className="containermain">
      <div className="container">
        <div className="search">
          <SearchBar text="Nome do Vídeo" />
          <SearchBar text="Cole o link do vídeo" />
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
                <button>Excluir</button>
              </div>
            </div>
          </div>
          <div className="viewVideoSelected">
            <video controls width="620" height="340" alt="">
              <source src="/assets/img/sample.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
