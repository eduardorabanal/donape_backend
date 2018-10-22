import { Necesidad } from "../../entity/Necesidad";

export class NecesidadRepo {
  static async findById(id: number) {
    return await Necesidad.findOne({
      where: { id },
      relations: ["publicacion"]
    });
  }
}
