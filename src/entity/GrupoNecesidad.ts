import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Necesidad } from "./Necesidad";
import { Usuario } from "./Usuario";

@Entity("GruposNecesidades")
export class GrupoNecesidad {
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

  @OneToMany(() => Necesidad, necesidad => necesidad.grupo)
  necesidades: Necesidad[];

  @ManyToOne(() => Usuario, usuario => usuario.gruposNecesidades)
  usuario: Usuario;
}
