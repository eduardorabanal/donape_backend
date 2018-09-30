// tslint:disable
// graphql typescript definitions

export namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: "Query";
    donacionesByNecesidad: Array<IDonacion>;
    donacionesByUsuario: Array<IDonacion>;
    donacion: IDonacion | null;
    necesidad: INecesidad | null;
    publicaciones: Array<IPublicacion>;
    publicacion: IPublicacion | null;
  }

  interface IDonacionesByNecesidadOnQueryArguments {
    necesidadId: number;
  }

  interface IDonacionOnQueryArguments {
    id: number;
  }

  interface INecesidadOnQueryArguments {
    id: number;
  }

  interface IPublicacionOnQueryArguments {
    id: number;
  }

  interface IDonacion {
    __typename: "Donacion";
    id: number;
    necesidad: INecesidad | null;
    fecha: string;
    cantidad: number;
    estados: Array<IDonacionEstado> | null;
  }

  interface INecesidad {
    __typename: "Necesidad";
    id: number;
    articulo: string;
    cantidad: number;
    fecha: string;
    publicacion: IPublicacion | null;
  }

  interface IPublicacion {
    __typename: "Publicacion";
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    necesidades: Array<INecesidad> | null;
    imagenes: Array<IImagen> | null;
  }

  interface IImagen {
    __typename: "Imagen";
    id: number;
    url: string;
  }

  interface IDonacionEstado {
    __typename: "DonacionEstado";
    id: string | null;
    donacion: IDonacion | null;
    nombre: string | null;
    fecha: string | null;
    imagenes: Array<IImagen> | null;
  }

  interface IMutation {
    __typename: "Mutation";
    crearDonacion: IDonacion | null;
  }

  interface ICrearDonacionOnMutationArguments {
    necesidad: number;
    cantidad: number;
  }
}

// tslint:enable
