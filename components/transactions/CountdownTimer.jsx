import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector, useDispatch } from "react-redux";
import { stopCountdownTimer } from "../../Redux/generalSlice";
import { useRouter } from "next/router";
const CountdownTimer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <CountdownCircleTimer
      isPlaying={true}
      duration={100}
      initialRemainingTime={100}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[7, 5, 2, 0]}
      onComplete={() => {
        dispatch(stopCountdownTimer());
      }}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};

export default CountdownTimer;
