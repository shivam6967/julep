import type {
  User,
  CreateUserRequest,
  ResourceCreatedResponse,
  ResourceUpdatedResponse,
  UpdateUserRequest,
} from "../api";

import { invariant } from "../utils/invariant";
import { isValidUuid4 } from "../utils/isValidUuid4";

import { BaseManager } from "./base";

export class UsersManager extends BaseManager {
  async get(userId: string): Promise<User> {
    try {
      invariant(isValidUuid4(userId), "id must be a valid UUID v4");

      const user = await this.apiClient.default.getUser({ userId });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create({
    name,
    about,
    docs = [],
  }: CreateUserRequest = {}): Promise<User> {
    try {
      const requestBody = { name, about, docs };
      const result: ResourceCreatedResponse =
        await this.apiClient.default.createUser({ requestBody });

      const user: User = { ...result, ...requestBody };
      return user;
    } catch (error) {
      throw error;
    }
  }

  async list({
    limit = 10,
    offset = 0,
    metadataFilter = {},
  }: {
    limit?: number;
    offset?: number;
    metadataFilter?: { [key: string]: any };
  } = {}): Promise<Array<User>> {
    const metadataFilterString: string = JSON.stringify(metadataFilter);
    const result = await this.apiClient.default.listUsers({
      limit,
      offset,
      metadataFilter: metadataFilterString,
    });

    return result.items;
  }

  async delete(userId: string): Promise<void> {
    try {
      invariant(isValidUuid4(userId), "id must be a valid UUID v4");

      await this.apiClient.default.deleteUser({ userId });
    } catch (error) {
      throw error;
    }
  }

  async update(
    userId: string,
    { about = "", name }: UpdateUserRequest = {},
  ): Promise<User> {
    try {
      invariant(isValidUuid4(userId), "id must be a valid UUID v4");

      const requestBody = { about, name };

      const result: ResourceUpdatedResponse =
        await this.apiClient.default.updateUser({
          userId,
          requestBody,
        });

      const user: User = { ...result, ...requestBody };
      return user;
    } catch (error) {
      throw error;
    }
  }
}
