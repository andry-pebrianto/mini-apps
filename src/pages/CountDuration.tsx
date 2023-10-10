import { Fragment, useState, useEffect } from "react";
import moment from "moment";

export default function CountDuration() {
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);
  const [dateStringStatus, setDateStringStatus] = useState<string>("");

  useEffect(() => {
    if (timeStamp > 0) {
      timeStamp > 0 && setInterval(() => setTimeStamp((value) => value - 1), 1000);
      console.log(dateStringStatus);
    } else {
      setCounting(false)
    }

    console.log("AA");
  }, [counting]);

  useEffect(() => {
    console.log(timeStamp);

    const duration = moment.duration(timeStamp, "seconds");

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const formattedTime = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;

    setDateStringStatus(formattedTime);
  }, [timeStamp])

  const inputDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeStamp(moment(event.target.value).unix() - moment().unix());
  };

  const startCount = () => {
    setCounting(true);

    const duration = moment.duration(timeStamp, "seconds");

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const formattedTime = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;

    setDateStringStatus(formattedTime);
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <h1 className="text-center">Count Duration</h1>

        <div
          className="mb-3 border p-4 bg-white mx-auto"
          style={{ maxWidth: "500px" }}
        >
          <label className="form-label">Select Date and Time</label>
          <div>
            <input
              type="datetime-local"
              className="form-control"
              onChange={inputDateHandler}
            />
          </div>
          {counting ? (
            <p>{dateStringStatus}</p>
          ) : (
            <button
              className="btn btn-primary mt-2"
              style={{ width: "100px" }}
              onClick={startCount}
            >
              Start!
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
