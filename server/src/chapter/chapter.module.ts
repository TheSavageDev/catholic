import { Module } from "@nestjs/common";
import { ChapterModuleBase } from "./base/chapter.module.base";
import { ChapterService } from "./chapter.service";
import { ChapterController } from "./chapter.controller";
import { ChapterResolver } from "./chapter.resolver";

@Module({
  imports: [ChapterModuleBase],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterResolver],
  exports: [ChapterService],
})
export class ChapterModule {}
