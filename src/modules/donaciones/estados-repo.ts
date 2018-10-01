import { DonacionEstado } from "../../entity/DonacionEstado";

export class EstadoDonacionRelacionRepo {
  static async findEstadosByDonacion(donacionId: number) {
    const estadosDonaciones = await DonacionEstado.find({
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
