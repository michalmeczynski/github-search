import MUIAvatar from "@mui/material/Avatar";
import { FC } from "react";

import { ComponentCommonProps } from "../component/component-common-props.model";

type Props = {
  alt: string;
  src: string;
} & ComponentCommonProps;

export const Avatar: FC<Props> = ({ alt, className, src, testId }) => {
  return <MUIAvatar alt={alt} className={className} data-testid={testId} src={src} />;
};
