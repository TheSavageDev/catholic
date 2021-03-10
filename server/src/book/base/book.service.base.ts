import { PrismaService } from "nestjs-prisma";
import {
  FindOneBookArgs,
  FindManyBookArgs,
  BookCreateArgs,
  BookUpdateArgs,
  BookDeleteArgs,
  Subset,
} from "@prisma/client";

export class BookServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyBookArgs>(args: Subset<T, FindManyBookArgs>) {
    return this.prisma.book.findMany(args);
  }
  findOne<T extends FindOneBookArgs>(args: Subset<T, FindOneBookArgs>) {
    return this.prisma.book.findOne(args);
  }
  create<T extends BookCreateArgs>(args: Subset<T, BookCreateArgs>) {
    return this.prisma.book.create<T>(args);
  }
  update<T extends BookUpdateArgs>(args: Subset<T, BookUpdateArgs>) {
    return this.prisma.book.update<T>(args);
  }
  delete<T extends BookDeleteArgs>(args: Subset<T, BookDeleteArgs>) {
    return this.prisma.book.delete(args);
  }
}
