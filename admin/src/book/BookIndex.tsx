import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { BookList } from "./BookList";
import { CreateBook } from "./CreateBook";
import { Book } from "./Book";

export const BookIndex = (): React.ReactElement => {
  useBreadcrumbs("/books/", "Books");

  return (
    <Switch>
      <PrivateRoute exact path={"/books/"} component={BookList} />
      <PrivateRoute path={"/books/new"} component={CreateBook} />
      <PrivateRoute path={"/books/:id"} component={Book} />
    </Switch>
  );
};
