import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany
} from "typeorm";
import { Necesidad } from "./Necesidad";
import { Usuario } from "./Usuario";
import { EstadoDonacionRelacion } from "./EstadoDonacionRelacion";

@Entity("Donaciones")
export class Donacion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  cantidad: number;

  @OneToMany(() => EstadoDonacionRelacion, estado => estado.donacion)
  estados: EstadoDonacionRelacion[];

  //
  @ManyToOne(() => Necesidad, necesidad => necesidad.donaciones)
  necesidad: Necesidad;

  @ManyToOne(() => Usuario, usuario => usuario.donaciones)
  usuario: Usuario;
}
