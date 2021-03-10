import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BookWhereUniqueInput } from "../../book/base/BookWhereUniqueInput";
import {
  ValidateNested,
  IsOptional,
  IsInt,
  IsDate,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
@ObjectType()
class Chapter {
  @ApiProperty({
    required: false,
    type: BookWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => BookWhereUniqueInput)
  @IsOptional()
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
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  title!: string;
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsInt()
  @Field(() => Number)
  verses!: number;
}
export { Chapter };
