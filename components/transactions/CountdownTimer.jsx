import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector, useDispatch } from "react-redux";
import { stopCountdownTimer } from "../../Redux/generalSlice";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
const CountdownTimer = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className='fixed top-0 right-0 left-0 flex justify-center bg-indigo-50 items-center h-screen w-full'>
        <BeatLoader
          color='indigo'
          loading={loading}
          size={10}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }
  return (
    <CountdownCircleTimer
      isPlaying={true}
      duration={100}
      initialRemainingTime={100}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[7, 5, 2, 0]}
      onComplete={() => {
        setLoading(true);
        dispatch(stopCountdownTimer());
      }}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};

export default CountdownTimer;
