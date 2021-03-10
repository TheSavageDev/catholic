import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Chapter } from "../api/chapter/Chapter";

type Props = { id: string };

export const ChapterTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Chapter,
    AxiosError,
    [string, string]
  >(["get-/api/chapters", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/chapters"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/chapters"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
