import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from "typeorm";
import { Publicacion } from "./Publicacion";

@Entity("Usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("char", { length: 60 })
  password: string;

  @Column("varchar", { length: 255 })
  nombre: string;

  @Column("char", { length: 9 })
  celular: string;

  @OneToMany(() => Publicacion, publicacion => publicacion.usuarioId)
  publicaciones: Publicacion[];
}
