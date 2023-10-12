import { Fragment } from "react";
import PreventRender from "./PreventRender";
import Countdown, { CountdownRenderProps } from "react-countdown";

interface WordScrambleTimerInterface {
  time: number;
  end: () => void;
  render: (countdown: CountdownRenderProps) => JSX.Element;
}

function WordScrambleTimer(props: WordScrambleTimerInterface) {
  return (
    <Fragment>
      <Countdown
        date={Date.now() + props.time * 1000} // 60 detik
        renderer={props.render}
        onComplete={props.end}
      />
    </Fragment>
  );
}

export default PreventRender(WordScrambleTimer);
