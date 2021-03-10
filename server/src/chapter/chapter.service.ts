import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ChapterServiceBase } from "./base/chapter.service.base";

@Injectable()
export class ChapterService extends ChapterServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
