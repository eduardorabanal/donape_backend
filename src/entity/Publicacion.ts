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

@Entity("Publicaciones")
export class Publicacion extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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
}
