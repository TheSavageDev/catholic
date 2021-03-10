import { ArgsType, Field } from "@nestjs/graphql";
import { ChapterWhereInput } from "./ChapterWhereInput";

@ArgsType()
class FindManyChapterArgs {
  @Field(() => ChapterWhereInput, { nullable: true })
  where?: ChapterWhereInput;
}

export { FindManyChapterArgs };
