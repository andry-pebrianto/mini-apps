import { Fragment, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";

interface DataMeme {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
}

export default function MemeGenerator() {
  const [dataMeme, setDataMeme] = useState<DataMeme | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [memeWidth, setMemeWidth] = useState<number>(600);

  useEffect(() => {
    fetchMeme();

    window.addEventListener("resize", () => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      if (screenWidth < 600) {
        setMemeWidth(() => 300);
      } else if (screenWidth < 800) {
        setMemeWidth(() => 400);
      } else {
        setMemeWidth(() => 600);
      }
    });
  }, []);

  async function fetchMeme() {
    try {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage("");

      const data = await axios.get("https://meme-api.com/gimme");

      setDataMeme(data.data);
    } catch (error: unknown) {
      const errorData = error as AxiosError;

      setIsError(true);
      setErrorMessage(errorData.message);
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-center">Meme Generator</h1>
        </div>
        <div className="mt-4">
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {isError ? (
                <p>{errorMessage}</p>
              ) : (
                <>
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      className="btn btn-outline-danger"
                      onClick={fetchMeme}
                    >
                      Refresh Meme
                    </button>
                  </div>
                  <div className="text-center mb-4">
                    <p>
                      {dataMeme?.author} |{" "}
                      <a href={dataMeme?.postLink}>{dataMeme?.postLink}</a>
                    </p>
                    <img
                      style={{ maxWidth: `${memeWidth}px` }}
                      src={dataMeme?.url}
                      alt={dataMeme?.title}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
}
