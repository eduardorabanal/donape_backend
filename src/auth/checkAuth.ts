export const checkAuth = (user: any) => {
  if (!user) {
    throw new Error("No autorizado");
  }
};
