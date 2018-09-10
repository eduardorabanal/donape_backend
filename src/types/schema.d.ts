// tslint:disable
// graphql typescript definitions

export namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery;
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
    listarPublicaciones: Array<IPublicacion>;
  }

  interface IPublicacion {
    __typename: "Publicacion";
    id: number;
    usuarioId: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    necesidades: Array<INecesidad> | null;
    imagenes: Array<IImagen> | null;
  }

  interface INecesidad {
    __typename: "Necesidad";
    id: number;
    articulo: string;
    cantidad: number;
    fecha: string;
    publicacion: IPublicacion | null;
  }

  interface IImagen {
    __typename: "Imagen";
    id: number;
    url: string;
  }
}

// tslint:enable
