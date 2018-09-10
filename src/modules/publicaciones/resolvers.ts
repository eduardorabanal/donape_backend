import { ResolverMap } from "../../types/graphql-utils";
import { Publicacion } from "../../entity/Publicacion";
// import { GQL } from "../../types/schema";

export const resolvers: ResolverMap = {
  Query: {
    listarPublicaciones: async () => {
      return await Publicacion.find({
        relations: ["necesidades", "imagenes"]
      });
    }
  }
};
