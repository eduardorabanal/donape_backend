import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Necesidad } from "./Necesidad";
import { Usuario } from "./Usuario";

@Entity("Publicaciones")
export class Publicacion {
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
}
