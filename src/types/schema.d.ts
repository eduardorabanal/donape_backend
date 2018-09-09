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
    bye2: string | null;
    hello: string;
    bye: string | null;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IMutation {
    __typename: "Mutation";
    login: Array<IError>;
    registrarse: Array<IError>;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegistrarseOnMutationArguments {
    email: string;
    password: string;
    nombre: string;
    celular: string;
  }

  interface IError {
    __typename: "Error";
    path: string;
    message: string;
  }
}

// tslint:enable
