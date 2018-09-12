import { Donacion } from "../../entity/Donacion";

const relations = ["necesidad", "usuario", "estados"];

export class DonacionRepo {
  static findByNecesidad(necesidadId: number) {
    return Donacion.find({
      where: { necesidad: necesidadId },
      relations
    });
  }
  static findByUsuario(usuarioId: number) {
    return Donacion.find({
      where: { usuario: usuarioId },
      relations
    });
  }
  static findById(id: number) {
    return Donacion.findOne({
      where: { id },
      relations: ["estados"]
    });
  }
  static async create(args: any) {
    const donacion = await Donacion.create(args).save();
    return Donacion.findOne({
      where: { id: donacion.id },
      relations
    });
  }
}
