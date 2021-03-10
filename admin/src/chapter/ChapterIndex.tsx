import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ChapterList } from "./ChapterList";
import { CreateChapter } from "./CreateChapter";
import { Chapter } from "./Chapter";

export const ChapterIndex = (): React.ReactElement => {
  useBreadcrumbs("/chapters/", "Chapters");

  return (
    <Switch>
      <PrivateRoute exact path={"/chapters/"} component={ChapterList} />
      <PrivateRoute path={"/chapters/new"} component={CreateChapter} />
      <PrivateRoute path={"/chapters/:id"} component={Chapter} />
    </Switch>
  );
};
