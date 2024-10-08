import MUIContainer from "@mui/material/Container";
import { FC, ReactNode } from "react";

import { ComponentCommonProps } from "../component/component-common-props.model";

type Props = {
  children?: ReactNode;
} & ComponentCommonProps;

export const Container: FC<Props> = ({ children, className }) => {
  return <MUIContainer className={className}>{children}</MUIContainer>;
};
