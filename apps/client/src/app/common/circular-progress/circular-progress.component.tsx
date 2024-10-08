import MUICircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

import { ComponentCommonProps } from "../component/component-common-props.model";

type Props = ComponentCommonProps;

export const CircularProgress: FC<Props> = ({ className, testId }) => {
  return <MUICircularProgress className={className} data-testid={testId} />;
};
