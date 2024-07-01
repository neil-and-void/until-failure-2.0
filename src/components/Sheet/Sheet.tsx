import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { colors } from "@until-failure-app/src/theme";
import { styled } from "nativewind";
import { ReactNode, RefObject } from "react";

const StyledBottomSheetBackdrop = styled(BottomSheetBackdrop);

interface SheetProps {
  children: ReactNode;
  sheetRef: RefObject<BottomSheetModalMethods>;
  snapPoints: string[];
  enablePanDownToClose: boolean;
}

export const Sheet = ({ children, sheetRef, snapPoints, enablePanDownToClose = true }: SheetProps) => {
  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      enablePanDownToClose={enablePanDownToClose}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <StyledBottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          className="bg-black/80"
          opacity={9}
          enableTouchThrough={false}
        />
      )}
      backgroundStyle={{
        backgroundColor: colors.secondary["900"],
      }}
    >
      {children}
    </BottomSheetModal>
  );
};
