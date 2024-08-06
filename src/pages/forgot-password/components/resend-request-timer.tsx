import React from "react";

interface ResendRequestTimerProps {
  timerIntervalInMilliseconds: number;
}

export function ResendRequestTimer({
  timerIntervalInMilliseconds,
}: ResendRequestTimerProps) {
  const [timerInterval, setTimerInterval] = React.useState(
    timerIntervalInMilliseconds / 1000,
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerInterval((prevState) => {
        if (prevState <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevState - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p className="mt-2 animate-fade-left text-center">
      Você poderá solicitar novamente em {timerInterval} segundos
    </p>
  );
}
