import { Typography } from "@/components/Typography/Typography";
import { FC } from "react";

type TProps = {
  message: string;
};

export const ErrorMessage: FC<TProps> = ({ message }) => (
  <Typography variant="s" color="textError">
    {message}
  </Typography>
);
