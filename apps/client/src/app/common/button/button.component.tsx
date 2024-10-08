import MUIButton from "@mui/material/Button";
import { FC, ReactNode } from "react";

import { ComponentCommonProps } from "../component/component-common-props.model";

type Props = {
  children?: ReactNode;
  onClick: VoidFunction;
} & ComponentCommonProps;

export const Button: FC<Props> = ({ children, className, onClick, testId }) => {
  return (
    <MUIButton className={className} data-testid={testId} onClick={onClick}>
      {children}
    </MUIButton>
  );
};
