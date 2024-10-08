import MUITypography from "@mui/material/Typography";
import { Variant as MUITypographyVariant } from "@mui/material/styles/createTypography";
import { FC, ReactNode } from "react";

import { ComponentCommonProps } from "../component/component-common-props.model";

type Props = {
  children?: ReactNode;
  textAlign?: TextAlign;
  variant?: Variant;
} & ComponentCommonProps;

type Variant = "body" | "subtitle";
type TextAlign = "center" | "left";

export const Typography: FC<Props> = ({ children, className, testId, textAlign, variant = "body" }) => {
  const variantOptions: Record<Variant, MUITypographyVariant> = {
    body: "body1",
    subtitle: "subtitle1"
  };

  return (
    <MUITypography className={className} data-testid={testId} textAlign={textAlign} variant={variantOptions[variant]}>
      {children}
    </MUITypography>
  );
};
