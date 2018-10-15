import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Necesidad } from "./Necesidad";
import { Usuario } from "./Usuario";
import { ImagenPublicacion } from "./ImagenPublicacion";

@Entity("publicacion")
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

  @OneToMany(() => ImagenPublicacion, imagen => imagen.publicacion)
  imagenes: ImagenPublicacion[];
}
