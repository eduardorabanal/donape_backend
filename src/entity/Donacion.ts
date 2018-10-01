import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
  CreateDateColumn
} from "typeorm";
import { Necesidad } from "./Necesidad";
import { Usuario } from "./Usuario";
import { DonacionEstado } from "./DonacionEstado";

@Entity("Donaciones")
export class Donacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  cantidad: number;

  @OneToMany(() => DonacionEstado, estado => estado.donacion)
  estados: DonacionEstado[];

  //
  @ManyToOne(() => Necesidad, necesidad => necesidad.donaciones)
  necesidad: Necesidad;

  @ManyToOne(() => Usuario, usuario => usuario.donaciones)
  usuario: Usuario;
}
