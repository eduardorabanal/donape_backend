import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
  CreateDateColumn
} from "typeorm";
import { Publicacion } from "./Publicacion";
import { Donacion } from "./Donacion";

@Entity("necesidad")
export class Necesidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articulo: string;

  @Column({ name: "es_ilimitada", default: false })
  esIlimitada: boolean;

  @Column({ name: "es_satisfecha", default: false })
  esSatisfecha: boolean;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    name: "cantidad_requerida",
    nullable: true
  })
  cantidadRequerida: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    name: "cantidad_recolectada",
    default: 0
  })
  cantidadRecolectada: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    name: "cantidad_faltante",
    nullable: true
  })
  cantidadFaltante: number;

  @CreateDateColumn()
  fecha: Date;

  @ManyToOne(() => Publicacion, publicacion => publicacion.necesidades)
  publicacion: Publicacion;

  @OneToMany(() => Donacion, donacion => donacion.necesidad)
  donaciones: Donacion[];
}
