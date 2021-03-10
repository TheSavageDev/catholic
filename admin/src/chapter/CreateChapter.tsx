import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { BookSelect } from "../book/BookSelect";
import { Chapter } from "../api/chapter/Chapter";
import { ChapterCreateInput } from "../api/chapter/ChapterCreateInput";

const INITIAL_VALUES = {} as ChapterCreateInput;

export const CreateChapter = (): React.ReactElement => {
  useBreadcrumbs("/chapters/new", "Create Chapter");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Chapter,
    AxiosError,
    ChapterCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/chapters", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/chapters"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ChapterCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Chapter"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <BookSelect label="bookId" name="bookId.id" />
          </div>
          <div>
            <TextField type="number" step={1} label="chapter" name="chapter" />
          </div>
          <div>
            <TextField label="title" name="title" />
          </div>
          <div>
            <TextField type="number" step={1} label="verses" name="verses" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
