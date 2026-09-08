import { useEffect, useState } from 'react';

const Countdown = ({ expiration }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (!expiration) {
      return undefined;
    }

    let cancelId;
    let lastSecond = Math.floor(Date.now() / 1000);

    const updateCountdown = () => {
      const now = Date.now();
      const currentSecond = Math.floor(now / 1000);

      if (lastSecond !== currentSecond) {
        lastSecond = currentSecond;
        setCurrentTime(now);
      }

      cancelId = requestAnimationFrame(updateCountdown);
    };

    cancelId = requestAnimationFrame(updateCountdown);

    return () => cancelAnimationFrame(cancelId);
  }, [expiration]);

  if (!expiration) {
    return <div className="de_countdown">Expired</div>;
  }

  const millisecondsLeft = expiration - currentTime;

  if (millisecondsLeft <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  // Convert the remaining milliseconds into one whole-seconds total to split into clock parts.
  const totalWholeSeconds = Math.floor(millisecondsLeft / 1000);
  // The seconds display is whatever is left over after removing full minutes.
  const seconds = totalWholeSeconds % 60;
  // Remove full hours first, then convert the remaining seconds into whole minutes.
  const minutes = Math.floor((totalWholeSeconds % 3600) / 60);
  // 3600 seconds make up one full hour.
  const hours = Math.floor(totalWholeSeconds / 3600);
  const secondsText = seconds.toString().padStart(2, "0");
  const minutesText = minutes.toString().padStart(2, "0");

  return (
    <div className="de_countdown">{`${hours}h ${minutesText}m ${secondsText}s`}</div>
  );
};

export default Countdown;