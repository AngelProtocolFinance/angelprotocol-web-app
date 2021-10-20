import { useState } from "react";
import Dropzone from "react-dropzone";
import "./FileUploader.css";

interface fileType {
  name: string;
  url: string;
}

export default function FileUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  const onDrop = (files: any) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
    console.log("dropped");
  };

  const onReadFile = () => {
    console.log("onReadFile");
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} onChange={onReadFile} />
              "Drag and drop file here, or click to select file"
            </div>
          </section>
        )}
      </Dropzone>

      <div className="alert alert-light" role="alert">
        {message}
      </div>

      {fileInfos.length > 0 && (
        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos.map((file: fileType, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
