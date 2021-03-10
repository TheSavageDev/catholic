import { ArgsType, Field } from "@nestjs/graphql";
import { ChapterWhereUniqueInput } from "./ChapterWhereUniqueInput";

@ArgsType()
class FindOneChapterArgs {
  @Field(() => ChapterWhereUniqueInput, { nullable: false })
  where!: ChapterWhereUniqueInput;
}

export { FindOneChapterArgs };
