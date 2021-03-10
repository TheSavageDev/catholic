import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BookWhereUniqueInput } from "../../book/base/BookWhereUniqueInput";
import { ValidateNested, IsOptional, IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class ChapterCreateInput {
  @ApiProperty({
    required: false,
    type: BookWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => BookWhereUniqueInput)
  @IsOptional()
  @Field(() => BookWhereUniqueInput, {
    nullable: true,
  })
  bookId?: BookWhereUniqueInput | null;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  chapter!: number;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  verses!: number;
}
export { ChapterCreateInput };
