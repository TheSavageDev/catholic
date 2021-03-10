import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Book } from "../api/book/Book";

type Props = { id: string };

export const BookTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Book,
    AxiosError,
    [string, string]
  >(["get-/api/books", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/books"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/books"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
