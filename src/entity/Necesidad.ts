import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany
} from "typeorm";
import { Publicacion } from "./Publicacion";
import { Donacion } from "./Donacion";

@Entity("necesidad")
export class Necesidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articulo: string;

  @Column({ name: "cantidad_requerida" })
  cantidadRequerida: number;

  @Column({ name: "cantidad_recolectada" })
  cantidadRecolectada: number;

  @Column({ name: "cantidad_faltante" })
  cantidadFaltante: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => Publicacion, publicacion => publicacion.necesidades)
  publicacion: Publicacion;

  @OneToMany(() => Donacion, donacion => donacion.necesidad)
  donaciones: Donacion[];
}
