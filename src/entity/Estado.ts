import { DonacionEstado } from "./DonacionEstado";
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";

@Entity("Estados")
export class Estado extends BaseEntity {
  @PrimaryColumn("char", { length: 2 })
  id: string;

  @Column()
  nombre: string;

  @OneToMany(() => DonacionEstado, donaciones => donaciones.estado)
  donaciones: DonacionEstado[];
}
