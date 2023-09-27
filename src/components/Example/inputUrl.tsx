import { useState, useRef } from "react";
import "./inputUrl.css"
export function InputUrl() {

  const [url, setUrl] = useState("");
  const [qrData, setQrData] = useState({url: "",date:""});
  const [p, setp] = useState("");

  const qrRef = useRef<HTMLInputElement>(null);
  
  function handleClick() {
    if(qrRef.current) {
      setUrl(qrRef.current.value); 
      const data = {url:"`https://api.qrserver.com/v1/create-qr-code/?data=" + url, size: 200, date: new Date().toLocaleString()}
      if(data)
        setQrData(data);
    }
  }

  function handleMetadataClick() {
    if (qrData && qrData.url) {
      setp(`URL: ${qrData.url}   Date: ${qrData.date}`); 
    }
  }
  return (
    <div className="div">
      <input ref={qrRef} type="text"/> 
      <button onClick={handleClick}>Generate</button>
      <button onClick={handleMetadataClick}>Show Metadata</button> 
      <div>
      {url && <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}`}/>}

      </div>
      <div><h2>{p}</h2></div>
    </div>
  );

}