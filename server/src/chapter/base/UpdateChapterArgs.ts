import { ArgsType, Field } from "@nestjs/graphql";
import { ChapterWhereUniqueInput } from "./ChapterWhereUniqueInput";
import { ChapterUpdateInput } from "./ChapterUpdateInput";

@ArgsType()
class UpdateChapterArgs {
  @Field(() => ChapterWhereUniqueInput, { nullable: false })
  where!: ChapterWhereUniqueInput;
  @Field(() => ChapterUpdateInput, { nullable: false })
  data!: ChapterUpdateInput;
}

export { UpdateChapterArgs };
