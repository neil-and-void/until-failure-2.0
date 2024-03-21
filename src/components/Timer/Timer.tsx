import { useCallback, useEffect, useState } from "react";
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

  const getHoursElapsed = useCallback(() => {
    const hrsElapsed = Math.floor(getMinutesElapsed() / 60);
    return hrsElapsed;
  }, []);

  const [minutesElapsed, setMinutesElapsed] = useState<number>(getMinutesElapsed());
  const [hoursElapsed, setHoursElapsed] = useState<number>(getHoursElapsed());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const minutesElapsed = getMinutesElapsed();
      const hoursElapsed = getHoursElapsed();

      setMinutesElapsed(minutesElapsed);
      setHoursElapsed(hoursElapsed);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatHours = useCallback(() => {
    let hours = getHoursElapsed();
    if (hours >= 99) {
      hours = 99;
    }

    return hours;
  }, []);

  const formatMinutes = useCallback(() => {
    let minutes = Math.trunc(minutesElapsed % 60);

    if (hoursElapsed >= 99) {
      minutes = 0;
    }

    return String(minutes).padStart(2, "0");
  }, []);

  return (
    <View className="flex flex-row">
      <Text className="text-white">{formatHours()}</Text>
      <Text className="text-white">h</Text>
      <Text className="text-white">{formatMinutes()}</Text>
      <Text className="text-white">m</Text>
    </View>
  );
}
