import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateBookArgs } from "./CreateBookArgs";
import { UpdateBookArgs } from "./UpdateBookArgs";
import { DeleteBookArgs } from "./DeleteBookArgs";
import { FindManyBookArgs } from "./FindManyBookArgs";
import { FindOneBookArgs } from "./FindOneBookArgs";
import { Book } from "./Book";
import { FindManyChapterArgs } from "../../chapter/base/FindManyChapterArgs";
import { Chapter } from "../../chapter/base/Chapter";
import { BookService } from "../book.service";

@graphql.Resolver(() => Book)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class BookResolverBase {
  constructor(
    protected readonly service: BookService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Book])
  @nestAccessControl.UseRoles({
    resource: "Book",
    action: "read",
    possession: "any",
  })
  async books(
    @graphql.Args() args: FindManyBookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Book[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Book",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Book, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Book",
    action: "read",
    possession: "own",
  })
  async book(
    @graphql.Args() args: FindOneBookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Book | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Book",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Book)
  @nestAccessControl.UseRoles({
    resource: "Book",
    action: "create",
    possession: "any",
  })
  async createBook(
    @graphql.Args() args: CreateBookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Book> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Book",
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
        `providing the properties: ${properties} on ${"Book"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Book)
  @nestAccessControl.UseRoles({
    resource: "Book",
    action: "update",
    possession: "any",
  })
  async updateBook(
    @graphql.Args() args: UpdateBookArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Book | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Book",
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
        `providing the properties: ${properties} on ${"Book"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
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

  @graphql.Mutation(() => Book)
  @nestAccessControl.UseRoles({
    resource: "Book",
    action: "delete",
    possession: "any",
  })
  async deleteBook(@graphql.Args() args: DeleteBookArgs): Promise<Book | null> {
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

  @graphql.ResolveField(() => [Chapter])
  @nestAccessControl.UseRoles({
    resource: "Book",
    action: "read",
    possession: "any",
  })
  async chapterIds(
    @graphql.Parent() parent: Book,
    @graphql.Args() args: FindManyChapterArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chapter[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Chapter",
    });
    const results = await this.service
      .findOne({ where: { id: parent.id } })
      // @ts-ignore
      .chapterIds(args);
    return results.map((result) => permission.filter(result));
  }
}
