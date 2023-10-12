import "react-toastify/dist/ReactToastify.css";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { CountdownRenderProps } from "react-countdown";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import WordScrambleTimer from "../components/WordScrambleTimer";

const wordsSample: string[] = [
  "Apel",
  "Anggur",
  "Alpukat",
  "Belimbing",
  "Ceri",
  "Delima",
  "Duku",
  "Durian",
  "Jambu",
  "Jeruk",
  "Kedondong",
  "Kiwi",
  "Kelengkeng",
  "Leci",
  "Mangga",
  "Manggis",
  "Melon",
  "Nanas",
  "Nangka",
  "Srikaya",
  "Pepaya",
  "Pisang",
  "Rambutan",
  "Salak",
  "Sawo",
  "Sirsak",
  "Semangka",
  "Pir",
  "Lemon",
  "Alpukat",
  "Bayam",
  "Jagung",
  "Jamur",
  "Kangkung",
  "Timun",
  "Kubis",
  "Labu",
  "Wortel",
  "Brokoli",
  "Terong",
  "Tomat",
  "Sawi",
  "Kacang",
  "Buncis",
  "Paprika",
  "Kol",
  "Singkong",
  "Seledri",
  "Pare",
  "Lobak",
];

export default function WordScramble() {
  const [words, setWords] = useState<string[]>(_.shuffle(wordsSample));
  const [score, setScore] = useState<number>(0);

  const [gameTime] = useState<number>(60);
  const [starting, setStarting] = useState<boolean>(false);

  const [wordPlayed, setWordPlayed] = useState<{
    original: string;
    scrambled: string;
  }>({ original: "", scrambled: "" });
  const [answer, setAnswer] = useState<string>("");

  console.log(words.length);
  console.log(wordPlayed.original);

  const customTimeRenderer = (countdown: CountdownRenderProps): JSX.Element => {
    let { seconds } = countdown.formatted;
    if (seconds === "00") seconds = `${gameTime}`;

    const formattedTime = `${seconds} detik`;
    const arrTimeSize: number[] = [15.5, 14, 12.5, 11, 9.5, 8, 6.5, 5, 3.5, 2];

    if (parseInt(seconds) <= 10) {
      return (
        <span
          className="text-danger"
          style={{ fontSize: `${16 + arrTimeSize[parseInt(seconds) - 1]}px` }}
        >
          {formattedTime}
        </span>
      );
    }

    return (
      <span className="text-primary" style={{ fontSize: `${16}px` }}>
        {formattedTime}
      </span>
    );
  };

  const startGame = () => {
    refreshWord(true);
    setStarting(true);
  };

  const refreshWord = (success: boolean): void => {
    const wordsCopy = [...words];

    if (wordsCopy.length === 0) {
      endGame();
    } else {
      const newSelectedWord = wordsCopy[0];
      const selectedWordShuffled = _.shuffle(newSelectedWord?.split("")).join(
        ""
      );

      if (success) {
        setWords(wordsCopy.slice(1));
        setWordPlayed({
          original: newSelectedWord,
          scrambled: selectedWordShuffled,
        });
      } else {
        setWords([...wordsCopy, wordPlayed.original].slice(1));
        setWordPlayed({
          original: newSelectedWord,
          scrambled: selectedWordShuffled,
        });
      }
    }
  };

  const checkAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (answer === wordPlayed.original) {
      toast.success("Jawaban Benar");

      refreshWord(true);
      setAnswer("");
      setScore(score + 1);
    } else {
      toast.error("Jawaban Salah");
    }
  };

  const endGame = () => {
    toast.success("Game Over");

    setStarting(false);
    setWords(_.shuffle(wordsSample));
    setAnswer("");
    setWordPlayed({
      original: "",
      scrambled: "",
    });
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
          <h1 className="text-center">Word Scramble</h1>
        </div>
          <p className="text-center fs-5">Fruit & Vegetable Edition</p>

        <div className="mt-4 mx-auto" style={{ maxWidth: "450px" }}>
          {starting ? (
            <>
              <p className="fs-2 text-center">
                {wordPlayed.scrambled}{" "}
                {words.length ? (
                  <span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => refreshWord(false)}
                    >
                      Skip
                    </button>
                  </span>
                ) : (
                  ""
                )}
              </p>
              <div className="d-flex justify-content-center mb-2">
                <div className="d-flex align-items-center">
                  <span className="me-2">Remaining Time:</span>
                  <WordScrambleTimer
                    time={gameTime}
                    end={endGame}
                    render={customTimeRenderer}
                  />
                </div>
              </div>
              <form className="d-flex" onSubmit={checkAnswer}>
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Type Answer"
                  value={answer}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAnswer(event.target.value.trim())
                  }
                />
                <button className="btn btn-primary" type="submit">
                  Check
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="text-center">Score: {score}</p>
              <div className="mx-auto d-flex justify-content-center">
                <button
                  className="btn btn-lg btn-outline-primary"
                  onClick={startGame}
                >
                  Start Game
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
