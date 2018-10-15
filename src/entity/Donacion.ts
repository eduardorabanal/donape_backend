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

@Entity("donacion")
export class Donacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "articulo_requerido" })
  articuloRequerido: string;

  @Column({ name: "articulo_donado" })
  articuloDonado: string;

  @CreateDateColumn()
  fecha: Date;

  @Column()
  cantidad: number;

  @OneToMany(() => DonacionEstado, estado => estado.donacion)
  estados: DonacionEstado[];

  @ManyToOne(() => Necesidad, necesidad => necesidad.donaciones)
  necesidad: Necesidad;

  @ManyToOne(() => Usuario, usuario => usuario.donaciones)
  usuario: Usuario;
}
