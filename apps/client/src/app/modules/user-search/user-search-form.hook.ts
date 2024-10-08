import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const useUserSearchForm = () => {
  return useForm<{ query: string }>({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        query: yup.string().defined().min(1, "To pole nie może być puste").required()
      })
    )
  });
};
