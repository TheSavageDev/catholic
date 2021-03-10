import { BookWhereUniqueInput } from "../book/BookWhereUniqueInput";

export type ChapterUpdateInput = {
  bookId?: BookWhereUniqueInput | null;
  chapter?: number;
  title?: string;
  verses?: number;
};
