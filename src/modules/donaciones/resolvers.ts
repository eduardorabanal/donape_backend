import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import { DonacionRepo } from "./repo";
import { EstadoDonacionRelacionRepo } from "./estados-repo";
import { Donacion } from "../../entity/Donacion";
import { checkAuth } from "../../auth/checkAuth";

const rellenarDonacion = (donacion: Donacion | undefined) => {
  if (donacion) {
    return {
      ...donacion,
      estados: EstadoDonacionRelacionRepo.findEstadosByDonacion(donacion.id)
    };
  }
  return donacion;
};

const rellenarDonaciones = (donaciones: Donacion[]) => {
  const result: any[] = [];
  donaciones.forEach(donacion => {
    result.push(rellenarDonacion(donacion));
  });
  return result;
};

export const resolvers: ResolverMap = {
  Query: {
    donacionesByNecesidad: async (
      _,
      { necesidadId }: GQL.IDonacionesByNecesidadOnQueryArguments
    ) => {
      return rellenarDonaciones(
        await DonacionRepo.findByNecesidad(necesidadId)
      );
    },

    donacionesByUsuario: async (_, {}, { user }) => {
      checkAuth(user);
      console.log("payload", user);
      const donaciones = await DonacionRepo.findByUsuario(user.id);
      return rellenarDonaciones(donaciones);
    },

    donacion: async (_, { id }: GQL.IDonacionOnQueryArguments) => {
      const donacion = await DonacionRepo.findById(id);
      return rellenarDonacion(donacion);
    }
  },
  Mutation: {
    crearDonacion: async (_, args: GQL.ICrearDonacionOnMutationArguments) => {
      const donacion = await DonacionRepo.create(args);
      return rellenarDonacion(donacion);
    }
  }
};
