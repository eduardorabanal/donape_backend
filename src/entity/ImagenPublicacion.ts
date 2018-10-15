import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from "typeorm";
import { Publicacion } from "./Publicacion";

@Entity("imagen_publicacion")
export class ImagenPublicacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Publicacion, publicacion => publicacion.imagenes)
  publicacion: Publicacion;
}
