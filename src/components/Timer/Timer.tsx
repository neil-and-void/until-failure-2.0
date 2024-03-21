import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

interface TimerProps {
  start: Date;
}

export default function Timer({ start }: TimerProps) {
  const getMinutesElapsed = useCallback(() => {
    const now = new Date();
    const deltaMs = now.getTime() - start.getTime();

    const delta = Math.trunc(deltaMs / (1000 * 60));

    return delta;
  }, []);

  const [minutesElapsed, setMinutesElapsed] = useState<number>(getMinutesElapsed());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsed = getMinutesElapsed();
      setMinutesElapsed(elapsed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = useCallback((minutesElapsed: number) => {
    let hours = Math.floor(minutesElapsed / 60);
    let minutes = Math.trunc(minutesElapsed % 60);

    if (hours >= 99) {
      hours = 99;
      minutes = 0;
    }

    const hourStr = String(hours).padStart(2, "0");
    const minuteStr = String(minutes).padStart(2, "0");

    return `${hourStr}:${minuteStr}`;
  }, []);

  return (
    <View>
      <Text className="text-white">{formatTime(minutesElapsed)}</Text>
    </View>
  );
}
