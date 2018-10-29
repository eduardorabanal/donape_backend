import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Publicacion } from "./Publicacion";
import { Donacion } from "./Donacion";

@Entity("usuario")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("char", { length: 60, nullable: false })
  password: string;

  @Column("varchar", { length: 255, nullable: false })
  nombre: string;

  @Column("varchar", { length: 8, nullable: false })
  dni: string;

  @Column("char", { length: 9, nullable: false })
  celular: string;

  @OneToMany(() => Publicacion, publicacion => publicacion.usuarioId)
  publicaciones: Publicacion[];

  @OneToMany(() => Donacion, donacion => donacion.usuario)
  donaciones: Donacion[];
}
