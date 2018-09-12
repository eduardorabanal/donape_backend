import { EstadoDonacionRelacion } from "./EstadoDonacionRelacion";
import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";

@Entity("EstadosDonaciones")
export class EstadoDonacion extends BaseEntity {
  @PrimaryColumn("char", { length: 2 })
  id: string;

  @Column()
  nombre: string;

  @OneToMany(() => EstadoDonacionRelacion, donaciones => donaciones.estado)
  donaciones: EstadoDonacionRelacion[];
}
