import { useMemo } from "react";
import { View } from "react-native";

interface ExerciseSummaryProps {
  warmup: number;
  working: number;
  drop: number;
  superCount: number;
}

const ExerciseSummary = ({
  warmup,
  working,
  drop,
  superCount,
}: ExerciseSummaryProps) => {
  const formattedString = useMemo(() => {
    const exerciseType[]
  }, [
    warmup,
    working,
    drop,
    superCount,
  ]);

  return <View>
    
  </View>;
};

export default ExerciseSummary;
