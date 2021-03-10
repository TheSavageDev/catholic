import { BookWhereUniqueInput } from "../book/BookWhereUniqueInput";

export type Chapter = {
  bookId?: BookWhereUniqueInput | null;
  chapter: number;
  createdAt: Date;
  id: string;
  title: string;
  updatedAt: Date;
  verses: number;
};
