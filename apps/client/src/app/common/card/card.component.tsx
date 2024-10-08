import MUICard from "@mui/material/Card";
import { FC, ReactNode } from "react";

import { ComponentCommonProps } from "../component/component-common-props.model";

type Props = {
  children?: ReactNode;
} & ComponentCommonProps;

export const Card: FC<Props> = ({ children, className, testId }) => {
  return (
    <MUICard className={className} data-testid={testId} variant="outlined">
      {children}
    </MUICard>
  );
};
