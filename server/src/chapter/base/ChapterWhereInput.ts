import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BookWhereUniqueInput } from "../../book/base/BookWhereUniqueInput";
import { Transform, Type } from "class-transformer";
import {
  ValidateNested,
  IsOptional,
  IsInt,
  IsDate,
  IsString,
} from "class-validator";
@InputType()
class ChapterWhereInput {
  @ApiProperty({
    required: false,
    type: BookWhereUniqueInput,
  })
  @Transform(JSON.parse)
  @ValidateNested()
  @Type(() => BookWhereUniqueInput)
  @IsOptional()
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
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  createdAt?: Date;
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id?: string;
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
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt?: Date;
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
export { ChapterWhereInput };
