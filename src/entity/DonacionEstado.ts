import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { Donacion } from "./Donacion";
import { Estado } from "./Estado";
import { ImagenEstado } from "./ImagenEstado";

@Entity("donacion_estado")
export class DonacionEstado extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @ManyToMany(() => ImagenEstado)
  @JoinTable({ name: "donacion_estado_imagen" })
  imagenes: ImagenEstado[];

  @ManyToOne(() => Donacion, donacion => donacion.estados)
  donacion: Donacion;

  @ManyToOne(() => Estado, estado => estado.donaciones)
  estado: Estado;
}
