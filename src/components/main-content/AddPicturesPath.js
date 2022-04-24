import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPicturesPath } from "../../features/connexion/connexionSlice";
import modalStyle from "../../style/modules/modal.module.css";
import inputStyle from "../../style/modules/input.module.css";
import buttonStyle from "../../style/modules/button.module.css";

import { TiWarning } from "react-icons/ti";
import { IoDocuments } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { NodeFunctions } from "../../shared/Constants";

const { ipcRenderer } = window.require("electron");

function AddPicturesPath() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const picturesPath = useSelector(selectPicturesPath);
  const [hide, setHide] = useState(true);
  const [popOff, setPopOff] = useState(true);
  const [folder, setFolder] = useState("");

  const exitMessageHandler = () => {
    setTimeout(() => {
      setHide(true);
    }, 1000);
  };

  const triggerInputFile = () => {
    document.getElementById("directory").click();
  };

  const getFolderName = (e) => {
    const folderName = e.target.files;
    if (folderName.length) {
      const path = folderName[0].path;
      const name = folderName[0].name;
      setFolder(path.replace(name, ""));
    } else {
      setFolder("");
    }
  };

  const onSubmit = (data) => {
    ipcRenderer.send(NodeFunctions.ADD_PICTURE_PATH, data.directory[0].path);
    reset();
    setFolder("");
  };

  useEffect(() => {
    if (picturesPath) {
      setHide(true);
      exitMessageHandler();
    } else {
      setHide(false);
      setPopOff(false);
    }
  }, [picturesPath]);

  return (
    <div
      className={modalStyle.message}
      data-height="title-bar"
      style={{
        display: `${hide ? "none" : "block"}`,
      }}
      target={!picturesPath && !popOff ? "show" : "hide"}
    >
      <form onSubmit={handleSubmit(onSubmit)} target="content">
        <div target="center">
          <TiWarning target="warning" size={32} />
        </div>

        <p target="confirme-message">
          aucun dossier n'est sélectionné ! <br />
          veuillez ajouter un dossier pour enregistrer vos photos <br />
          <span data-color="danger">
            qui doit contenir une image en moin a l'interieur !
          </span>
        </p>

        <div target="flex-mr">
          <div className={inputStyle.simpleContainer} style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="chemin du dossier"
              className={inputStyle.simple}
              value={folder}
              disabled
            />
            <IoDocuments
              className={inputStyle.icon}
              data-color={errors.directory ? "danger" : ""}
            />
          </div>

          <button
            onClick={triggerInputFile}
            className={buttonStyle.success}
            type="button"
          >
            ajouter un chemin
          </button>

          <input
            className="hide"
            id="directory"
            type="file"
            webkitdirectory=""
            multiple
            {...register("directory", {
              required: true,
              onChange: (e) => getFolderName(e),
            })}
          />
        </div>

        <button type="submit" className={buttonStyle.simpleButton}>
          enregistrer
        </button>
      </form>
    </div>
  );
}

export default AddPicturesPath;
