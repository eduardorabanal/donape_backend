import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import { DonacionRepo } from "./repo";
import { EstadoDonacionRelacionRepo } from "./estados-repo";
import { Donacion } from "../../entity/Donacion";
import { checkAuth } from "../../auth/checkAuth";
import * as moment from "moment";

const rellenarDonacion = (donacion: Donacion | undefined) => {
  if (donacion) {
    return {
      ...donacion,
      estados: EstadoDonacionRelacionRepo.findEstadosByDonacion(donacion.id)
    };
  }
  return donacion;
};

const rellenarDonaciones = (donaciones: any[]) => {
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
      const donaciones = await DonacionRepo.findByUsuario(user.id);
      const donacionesMapped = donaciones.map(function(donacion) {
        return {
          ...donacion,
          fecha: moment(donacion.fecha).format("DD/MM/YYYY")
        };
      });
      return rellenarDonaciones(donacionesMapped);
    },

    donacion: async (_, { id }: GQL.IDonacionOnQueryArguments) => {
      const donacion = await DonacionRepo.findById(id);
      return rellenarDonacion(donacion);
    }
  },
  Mutation: {
    crearDonacion: async (
      _,
      { necesidad, cantidad }: GQL.ICrearDonacionOnMutationArguments,
      { user }
    ) => {
      checkAuth(user);
      const donacion = await DonacionRepo.create({
        necesidad,
        cantidad,
        usuario: user.id
      });
      return rellenarDonacion(donacion);
    }
  }
};
