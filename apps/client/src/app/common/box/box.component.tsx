import MUIBox from "@mui/material/Box";
import { FC, ReactNode } from "react";

import { ComponentCommonProps } from "../component/component-common-props.model";

type Props = {
  children?: ReactNode;
  width?: string;
} & ComponentCommonProps;

export const Box: FC<Props> = ({ children, className, testId, width }) => {
  return (
    <MUIBox className={className} data-testid={testId} width={width}>
      {children}
    </MUIBox>
  );
};
