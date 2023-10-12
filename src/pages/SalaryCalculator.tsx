import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SalaryCalculator() {
  const [gajiPokok, setGajiPokok] = useState<number>(0);
  const [gajiKotor, setGajiKotor] = useState<number>(0);
  const [gajiBersih, setGajiBersih] = useState<number>(0);
  const [tunjangan, setTunjangan] = useState<number>(0);
  const [kewajibanPokok, setKewajibanPokok] = useState<number>(0);

  useEffect(() => {
    calculateSalary();
  }, [gajiPokok, tunjangan, kewajibanPokok]);

  const calculateSalary = () => {
    setGajiKotor(gajiPokok + tunjangan);
    setGajiBersih(gajiPokok + tunjangan - kewajibanPokok);
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
          <h1 className="text-center">Salary Calculator</h1>
        </div>

        <div className="mt-4">
          <div
            className="row mx-auto border border-2 border-primary rounded p-2"
            style={{ maxWidth: "900px" }}
          >
            <div className="col">
              <form>
                <div className="my-2">
                  <label htmlFor="gajiPokok" className="mb-2">
                    Gaji Pokok
                  </label>
                  <input
                    id="gajiPokok"
                    type="number"
                    className="form-control"
                    value={gajiPokok}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setGajiPokok(parseInt(event.target.value))
                    }
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="tunjangan" className="mb-2">
                    Tunjangan
                  </label>
                  <input
                    id="tunjangan"
                    type="number"
                    className="form-control"
                    value={tunjangan}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setTunjangan(parseInt(event.target.value))
                    }
                  />
                </div>
                <div className="my-2">
                  <label htmlFor="kewajibanPokok" className="mb-2">
                    Kewajiban Pokok
                  </label>
                  <input
                    id="kewajibanPokok"
                    type="number"
                    className="form-control"
                    value={kewajibanPokok}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setKewajibanPokok(parseInt(event.target.value))
                    }
                  />
                </div>
              </form>
            </div>
            <div className="col d-flex flex-column justify-content-center">
              <h3>Hasil</h3>
              <p>Gaji Kotor: {gajiKotor} </p>
              <p>Gaji Pokok: {gajiPokok} </p>
              <p>Gaji Bersih: {gajiBersih} </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
