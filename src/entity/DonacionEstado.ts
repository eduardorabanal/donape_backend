import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne
} from "typeorm";
import { Donacion } from "./Donacion";
import { Estado } from "./Estado";
import { Imagen } from "./Imagenes";

@Entity("DonacionesEstados")
export class DonacionEstado extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @ManyToMany(() => Imagen)
  @JoinTable({ name: "DonacionesEstados_Imagenes" })
  imagenes: Imagen[];

  //
  @ManyToOne(() => Donacion, donacion => donacion.estados)
  donacion: Donacion;

  @ManyToOne(() => Estado, estado => estado.donaciones)
  estado: Estado;
}
