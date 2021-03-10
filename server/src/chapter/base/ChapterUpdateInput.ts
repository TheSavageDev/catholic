import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BookWhereUniqueInput } from "../../book/base/BookWhereUniqueInput";
import { ValidateNested, IsOptional, IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class ChapterUpdateInput {
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
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  chapter?: number;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  title?: string;
  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  verses?: number;
}
export { ChapterUpdateInput };
