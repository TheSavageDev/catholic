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
import { Book as TBook } from "../api/book/Book";
import { BookUpdateInput } from "../api/book/BookUpdateInput";

export const Book = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/books/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TBook,
    AxiosError,
    [string, string]
  >(["get-/api/books", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/books"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TBook, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/books"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//books");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TBook, AxiosError, BookUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/books"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: BookUpdateInput) => {
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
    () => pick(data, ["chapters", "testament", "title", "verses"]),
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
                title={`${"Book"} ${
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
              <TextField
                type="number"
                step={1}
                label="chapters"
                name="chapters"
              />
            </div>
            <div>
              <TextField label="testament" name="testament" />
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
