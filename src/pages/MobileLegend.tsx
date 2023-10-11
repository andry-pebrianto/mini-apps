import { Fragment, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";

interface DataHero {
  hero_id: number;
  hero_name: string;
  hero_avatar: string;
  hero_role: string;
  hero_specially: string;
}

export default function MobileLegend() {
  const [dataHeroOriginal, setDataHeroOriginal] = useState<DataHero[]>([]);
  const [dataHero, setDataHero] = useState<DataHero[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [filterKey, setFilterKey] = useState<string>("");

  useEffect(() => {
    async function fetchDataHero() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        const data = await axios.get(
          "https://api.dazelpro.com/mobile-legends/hero"
        );

        setDataHeroOriginal(data.data.hero);
        setDataHero(data.data.hero);
      } catch (error: unknown) {
        const errorData = error as AxiosError;

        setIsError(true);
        setErrorMessage(errorData.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataHero();
  }, []);

  const filterHero = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(`.*${event.target.value.toLocaleLowerCase()}.*`);
    const filteredData = dataHeroOriginal.filter((hero) =>
      regex.test(hero.hero_name.toLocaleLowerCase())
    );

    setFilterKey(event.target.value);
    setDataHero(filteredData);
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            <Link className="btn btn-sm btn-primary me-2 mb-1" to={"/"}>
              ← Back
            </Link>
          </div>
          <h1 className="text-center">Mobile Legend</h1>
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
                  <div style={{ maxWidth: "400px" }}>
                    <input
                      onChange={filterHero}
                      className="form-control me-2"
                      type="search"
                      placeholder="Search Hero by Name"
                    />
                  </div>
                  {dataHero.map((hero) => (
                    <div
                      key={hero.hero_id}
                      className="border border-3 p-3 my-3"
                    >
                      <p className="mb-1 fs-5 fw-bold">
                        <Highlighter
                          highlightClassName="HeroNameHighlight"
                          searchWords={[filterKey]}
                          autoEscape={true}
                          textToHighlight={hero.hero_name}
                          highlightStyle={{ backgroundColor: "#CCFFFF" }}
                        />
                      </p>
                      <p className="mb-1">Role: {hero.hero_role}</p>
                      <p className="mb-1">Specially: {hero.hero_specially}</p>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
}
