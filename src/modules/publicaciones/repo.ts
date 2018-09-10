import { Publicacion } from "../../entity/Publicacion";

const relations = ["necesidades", "imagenes"];
export class PublicacionRepo {
  static findAll() {
    return Publicacion.find({
      relations
    });
  }
  static findById(id: number) {
    return Publicacion.findOne({
      where: { id },
      relations
    });
  }
}
