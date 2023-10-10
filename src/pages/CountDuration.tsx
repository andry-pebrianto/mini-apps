import { Fragment, useState } from "react";
import moment from "moment";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { Link } from "react-router-dom";

type CountStatusType = {
  message: string | null;
  isError: boolean;
};

export default function CountDuration() {
  const [dateSelected, setDateSelected] = useState<
    string | number | readonly string[] | undefined
  >("");
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);
  const [countStatus, setCountStatus] = useState<CountStatusType>({
    message: null,
    isError: false,
  });

  const inputDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateSelected(event.target.value);
    setTimeStamp(moment(event.target.value).unix() - moment().unix());
  };

  const startCount = () => {
    if (timeStamp > 0) {
      setCounting(true);

      setCountStatus({
        message: null,
        isError: false,
      });
    } else {
      if (timeStamp < 0) {
        setCountStatus({
          message: "Memilih tanggal di masa lalu tidak diperbolehkan.",
          isError: true,
        });
      } else {
        setCountStatus({
          message: "Silahkan pilih tanggal dan waktu yang anda inginkan.",
          isError: true,
        });
      }
    }
  };

  const resetCount = () => {
    setCounting(false);
    setDateSelected("");
    setTimeStamp(0);

    setCountStatus({
      message: null,
      isError: false,
    });
  };

  const customCountdownRenderer = (countdown: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdown.formatted;
    const formattedTime = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;

    return formattedTime;
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
          <h1 className="text-center">Count Duration</h1>
        </div>

        <div
          className="border p-4 bg-white mx-auto mt-4"
          style={{ maxWidth: "600px" }}
        >
          {countStatus.message && (
            <>
              <div
                className={`alert ${
                  countStatus.isError ? "alert-danger" : "alert-success"
                }`}
              >
                {countStatus.message}
              </div>
            </>
          )}
          <label className="form-label">Select Date and Time</label>
          <div>
            <input
              type="datetime-local"
              className="form-control"
              onChange={inputDateHandler}
              value={dateSelected}
            />
          </div>
          {counting ? (
            <>
              <button
                className="btn btn-danger mt-3"
                style={{ width: "100px" }}
                onClick={resetCount}
              >
                Reset
              </button>
              <div className="mt-2">
                <Countdown
                  date={Date.now() + timeStamp * 1000}
                  renderer={customCountdownRenderer}
                  onComplete={() => {
                    setCounting(false);
                    setDateSelected("");
                    setTimeStamp(0);

                    setCountStatus({
                      message: "Hitung mundur selesai.",
                      isError: false,
                    });
                  }}
                />
              </div>
            </>
          ) : (
            <button
              className="btn btn-primary mt-3"
              style={{ width: "100px" }}
              onClick={startCount}
            >
              Start
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
