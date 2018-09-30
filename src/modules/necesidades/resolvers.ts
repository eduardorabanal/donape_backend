import { NecesidadRepo } from "./repo";
import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";

export const resolvers: ResolverMap = {
  Query: {
    necesidad: async (_, { id }: GQL.INecesidadOnQueryArguments) => {
      return await NecesidadRepo.findById(id);
    }
  }
};
