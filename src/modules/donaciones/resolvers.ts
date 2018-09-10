import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import { DonacionRepo } from "./repo";

export const resolvers: ResolverMap = {
  Query: {
    donacionesByNecesidad: async (
      _,
      { necesidadId }: GQL.IDonacionesByNecesidadOnQueryArguments
    ) => {
      return await DonacionRepo.findByNecesidad(necesidadId);
    },

    donacion: async (_, { id }: GQL.IDonacionOnQueryArguments) => {
      return await DonacionRepo.findById(id);
    }
  },
  Mutation: {
    crearDonacion: async (_, args: GQL.ICrearDonacionOnMutationArguments) => {
      return await DonacionRepo.create(args);
    }
  }
};
