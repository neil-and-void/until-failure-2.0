import { createContext } from "react";
import { EditSetSchemeModalType, SetScheme } from "../types";

export type EditSetSchemeModalState = {
  isOpen: boolean;
  type: EditSetSchemeModalType | null;
  setScheme: SetScheme | null;
};

type EditSetSchemeModalValue = {
  editSetSchemeModalState: EditSetSchemeModalState;
  setEditSetSchemeModalState: (
    editSetSchemeModalState: EditSetSchemeModalState,
  ) => void;
};

export const EditSetSchemeModalContext = createContext<EditSetSchemeModalValue>(
  {
    editSetSchemeModalState: {
      isOpen: false,
      type: null,
      setScheme: null,
    },
    setEditSetSchemeModalState: (
      _editSetSchemeModalState: EditSetSchemeModalState,
    ) => {},
  },
);
