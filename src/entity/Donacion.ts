import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity
} from "typeorm";
import { Necesidad } from "./Necesidad";
import { Usuario } from "./Usuario";

@Entity("Donaciones")
export class Donacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Necesidad, necesidad => necesidad.donaciones)
  necesidad: Necesidad;

  @ManyToOne(() => Usuario, usuario => usuario.donaciones)
  usuario: Usuario;

  @Column()
  fecha: Date;

  @Column()
  cantidad: number;
}
