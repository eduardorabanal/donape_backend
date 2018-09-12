import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import { DonacionRepo } from "./repo";
import { EstadoDonacionRelacionRepo } from "./estados-repo";

export const resolvers: ResolverMap = {
  Query: {
    donacionesByNecesidad: async (
      _,
      { necesidadId }: GQL.IDonacionesByNecesidadOnQueryArguments
    ) => {
      return await DonacionRepo.findByNecesidad(necesidadId);
    },

    donacionesByUsuario: async (_, { usuarioId }) => {
      const donaciones = await DonacionRepo.findByUsuario(usuarioId);
      const result: any[] = [];
      donaciones.forEach(donacion => {
        result.push({
          ...donacion,
          estados: EstadoDonacionRelacionRepo.findEstadosByDonacion(donacion.id)
        });
      });
      return result;
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
