import { PrismaService } from "nestjs-prisma";
import {
  FindOneChapterArgs,
  FindManyChapterArgs,
  ChapterCreateArgs,
  ChapterUpdateArgs,
  ChapterDeleteArgs,
  Subset,
} from "@prisma/client";

export class ChapterServiceBase {
  constructor(protected readonly prisma: PrismaService) {}
  findMany<T extends FindManyChapterArgs>(
    args: Subset<T, FindManyChapterArgs>
  ) {
    return this.prisma.chapter.findMany(args);
  }
  findOne<T extends FindOneChapterArgs>(args: Subset<T, FindOneChapterArgs>) {
    return this.prisma.chapter.findOne(args);
  }
  create<T extends ChapterCreateArgs>(args: Subset<T, ChapterCreateArgs>) {
    return this.prisma.chapter.create<T>(args);
  }
  update<T extends ChapterUpdateArgs>(args: Subset<T, ChapterUpdateArgs>) {
    return this.prisma.chapter.update<T>(args);
  }
  delete<T extends ChapterDeleteArgs>(args: Subset<T, ChapterDeleteArgs>) {
    return this.prisma.chapter.delete(args);
  }
}
