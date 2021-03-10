import { ArgsType, Field } from "@nestjs/graphql";
import { ChapterCreateInput } from "./ChapterCreateInput";

@ArgsType()
class CreateChapterArgs {
  @Field(() => ChapterCreateInput, { nullable: false })
  data!: ChapterCreateInput;
}

export { CreateChapterArgs };
