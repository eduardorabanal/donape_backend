import { EstadoDonacionRelacion } from "../../entity/EstadoDonacionRelacion";

export class EstadoDonacionRelacionRepo {
  static async findEstadosByDonacion(donacionId: number) {
    const estadosDonaciones = await EstadoDonacionRelacion.find({
      where: { donacion: donacionId },
      relations: ["estado", "imagenes"]
    });

    const result: any[] = [];

    estadosDonaciones.forEach(estadoDonacion => {
      result.push({
        ...estadoDonacion.estado,
        ...estadoDonacion
      });
    });

    return result;
  }
}
