import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Necesidad } from "./Necesidad";
import { Usuario } from "./Usuario";
import { Imagen } from "./Imagenes";

@Entity("Publicaciones")
export class Publicacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @OneToMany(() => Necesidad, necesidad => necesidad.publicacion)
  necesidades: Necesidad[];

  @ManyToOne(() => Usuario, usuario => usuario.publicaciones)
  usuario: Usuario;

  @ManyToMany(() => Imagen)
  @JoinTable({ name: "Publicaciones_Imagenes" })
  imagenes: Imagen[];
}
