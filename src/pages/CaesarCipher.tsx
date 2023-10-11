import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function CaesarCipher() {
  const [encryptText, setEncryptText] = useState<string>("");
  const [encryptKey, setEncryptKey] = useState<number>(0);
  const [encryptResult, setEncryptResult] = useState<string>("");
  const [decryptText, setDecryptText] = useState<string>("");
  const [decryptKey, setDecryptKey] = useState<number>(0);
  const [decryptResult, setDecryptResult] = useState<string>("");

  function caesarCipher(text: string, shift: number): string {
    let result = "";

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (char.match(/[a-zA-Z]/)) {
        const code = text.charCodeAt(i);

        if (code >= 65 && code <= 90) {
          char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
      }

      result += char;
    }

    return result;
  }

  function startEncrypt() {
    setEncryptResult(caesarCipher(encryptText, encryptKey));
  }

  function startDecrypt() {
    let decryptKeyPerformed = decryptKey;

    while (decryptKeyPerformed > 26) {
      decryptKeyPerformed = decryptKeyPerformed - 26;
    }

    setDecryptResult(caesarCipher(decryptText, 26 - decryptKeyPerformed));
  }

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <Link className="btn btn-sm btn-primary me-2 mb-1" to={"/"}>
              ← Back
            </Link>
          </div>
          <h1 className="text-center">Caesar Cipher</h1>
        </div>

        <div className="mt-4 mx-auto" style={{ maxWidth: "800px" }}>
          <div className="row mx-4 mx-sm-0">
            <div className="col-12 col-sm-6">
              <p className="text-center">Encrypt</p>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Input Character"
                  className="form-control"
                  value={encryptText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEncryptText(event.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Input Key"
                  className="form-control"
                  value={encryptKey}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEncryptKey(
                      event.target.value === ""
                        ? 0
                        : parseInt(event.target.value)
                    );
                  }}
                />
              </div>
              <div className="mb-3">
                <button onClick={startEncrypt} className="btn btn-primary">
                  Submit Encrypt
                </button>
              </div>
              <div className="mb-3">
                <input
                  style={{ cursor: "text" }}
                  type="text"
                  placeholder="Result"
                  className="form-control"
                  disabled
                  value={encryptResult}
                />
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <p className="text-center">Decrypt</p>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Input Character"
                  className="form-control"
                  value={decryptText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setDecryptText(event.target.value)
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Input Key"
                  className="form-control"
                  value={decryptKey}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDecryptKey(
                      event.target.value === ""
                        ? 0
                        : parseInt(event.target.value)
                    );
                  }}
                />
              </div>
              <div className="mb-3">
                <button onClick={startDecrypt} className="btn btn-primary">
                  Submit Decrypt
                </button>
              </div>
              <div className="mb-3">
                <input
                  style={{ cursor: "text" }}
                  type="text"
                  placeholder="Result"
                  className="form-control"
                  disabled
                  value={decryptResult}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
