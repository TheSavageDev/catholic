import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { BookSelect } from "../book/BookSelect";
import { Chapter as TChapter } from "../api/chapter/Chapter";
import { ChapterUpdateInput } from "../api/chapter/ChapterUpdateInput";

export const Chapter = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/chapters/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TChapter,
    AxiosError,
    [string, string]
  >(["get-/api/chapters", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/chapters"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TChapter, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/chapters"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//chapters");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TChapter, AxiosError, ChapterUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/chapters"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ChapterUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.title);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["bookId", "chapter", "title", "verses"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Chapter"} ${
                  data?.title && data?.title.length ? data.title : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <BookSelect label="bookId" name="bookId.id" />
            </div>
            <div>
              <TextField
                type="number"
                step={1}
                label="chapter"
                name="chapter"
              />
            </div>
            <div>
              <TextField label="title" name="title" />
            </div>
            <div>
              <TextField type="number" step={1} label="verses" name="verses" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
