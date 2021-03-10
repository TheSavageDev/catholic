import { ArgsType, Field } from "@nestjs/graphql";
import { BookWhereUniqueInput } from "./BookWhereUniqueInput";

@ArgsType()
class FindOneBookArgs {
  @Field(() => BookWhereUniqueInput, { nullable: false })
  where!: BookWhereUniqueInput;
}

export { FindOneBookArgs };
