import { DonacionEstado } from "./DonacionEstado";
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";

@Entity("estado")
export class Estado extends BaseEntity {
  @PrimaryColumn("char", { length: 2 })
  id: string;

  @Column()
  nombre: string;

  @Column({name: "actualiza_necesidad", default: false})
  actualizaNecesidad: boolean;

  @OneToMany(() => DonacionEstado, donaciones => donaciones.estado)
  donaciones: DonacionEstado[];
}
