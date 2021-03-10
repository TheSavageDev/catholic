import { ArgsType, Field } from "@nestjs/graphql";
import { BookWhereInput } from "./BookWhereInput";

@ArgsType()
class FindManyBookArgs {
  @Field(() => BookWhereInput, { nullable: true })
  where?: BookWhereInput;
}

export { FindManyBookArgs };
