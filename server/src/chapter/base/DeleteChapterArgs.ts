import { ArgsType, Field } from "@nestjs/graphql";
import { ChapterWhereUniqueInput } from "./ChapterWhereUniqueInput";

@ArgsType()
class DeleteChapterArgs {
  @Field(() => ChapterWhereUniqueInput, { nullable: false })
  where!: ChapterWhereUniqueInput;
}

export { DeleteChapterArgs };
