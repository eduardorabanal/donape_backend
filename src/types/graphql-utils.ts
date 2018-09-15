export interface ResolverMap {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: {
        url: string;
        user: any;
      },
      info: any
    ) => any;
  };
}
