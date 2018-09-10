import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import { PublicacionRepo } from "./repo";

export const resolvers: ResolverMap = {
  Query: {
    publicaciones: async () => {
      return await PublicacionRepo.findAll();
    },
    publicacion: async (_, { id }: GQL.IPublicacionOnQueryArguments) => {
      return await PublicacionRepo.findById(id);
    }
  }
};
