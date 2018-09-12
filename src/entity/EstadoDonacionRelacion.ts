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
import { EstadoDonacion } from "./EstadoDonacion";
import { Imagen } from "./Imagenes";

@Entity("EstadosDonacionesRelacion")
export class EstadoDonacionRelacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @ManyToMany(() => Imagen)
  @JoinTable({ name: "EstadosDonaciones_Imagenes" })
  imagenes: Imagen[];

  //
  @ManyToOne(() => Donacion, donacion => donacion.estados)
  donacion: Donacion;

  @ManyToOne(() => EstadoDonacion, estado => estado.donaciones)
  estado: EstadoDonacion;
}
