import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Book } from "../api/book/Book";

type Data = Book[];

type Props = Omit<SelectFieldProps, "options">;

export const BookSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/books", async () => {
    const response = await api.get("/api/books");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.title && item.title.length ? item.title : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
