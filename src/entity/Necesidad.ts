import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Publicacion } from "./Publicacion";

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
}
