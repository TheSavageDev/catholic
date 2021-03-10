import { BookWhereUniqueInput } from "../book/BookWhereUniqueInput";

export type ChapterCreateInput = {
  bookId?: BookWhereUniqueInput | null;
  chapter: number;
  title: string;
  verses: number;
};
