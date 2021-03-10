import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateChapterArgs } from "./CreateChapterArgs";
import { UpdateChapterArgs } from "./UpdateChapterArgs";
import { DeleteChapterArgs } from "./DeleteChapterArgs";
import { FindManyChapterArgs } from "./FindManyChapterArgs";
import { FindOneChapterArgs } from "./FindOneChapterArgs";
import { Chapter } from "./Chapter";
import { Book } from "../../book/base/Book";
import { ChapterService } from "../chapter.service";

@graphql.Resolver(() => Chapter)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class ChapterResolverBase {
  constructor(
    protected readonly service: ChapterService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Chapter])
  @nestAccessControl.UseRoles({
    resource: "Chapter",
    action: "read",
    possession: "any",
  })
  async chapters(
    @graphql.Args() args: FindManyChapterArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chapter[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Chapter",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Chapter, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Chapter",
    action: "read",
    possession: "own",
  })
  async chapter(
    @graphql.Args() args: FindOneChapterArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chapter | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Chapter",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Chapter)
  @nestAccessControl.UseRoles({
    resource: "Chapter",
    action: "create",
    possession: "any",
  })
  async createChapter(
    @graphql.Args() args: CreateChapterArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chapter> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Chapter",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Chapter"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        bookId: args.data.bookId
          ? {
              connect: args.data.bookId,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Chapter)
  @nestAccessControl.UseRoles({
    resource: "Chapter",
    action: "update",
    possession: "any",
  })
  async updateChapter(
    @graphql.Args() args: UpdateChapterArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chapter | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Chapter",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Chapter"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          bookId: args.data.bookId
            ? {
                connect: args.data.bookId,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Chapter)
  @nestAccessControl.UseRoles({
    resource: "Chapter",
    action: "delete",
    possession: "any",
  })
  async deleteChapter(
    @graphql.Args() args: DeleteChapterArgs
  ): Promise<Chapter | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Book, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Chapter",
    action: "read",
    possession: "any",
  })
  async bookId(
    @graphql.Parent() parent: Chapter,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Book | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Book",
    });
    const result = await this.service
      .findOne({ where: { id: parent.id } })
      .bookId();

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
