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

@Entity("Necesidades")
export class Necesidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articulo: string;

  @Column()
  cantidad: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => Publicacion, publicacion => publicacion.necesidades)
  publicacion: Publicacion;

  @OneToMany(() => Donacion, donacion => donacion.necesidad)
  donaciones: Donacion[];
}
