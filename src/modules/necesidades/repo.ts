import { Necesidad } from "../../entity/Necesidad";

export class NecesidadRepo {
  static findById(id: number) {
    return Necesidad.findOne({
      where: { id },
      relations: ["publicacion"]
    });
  }
}
