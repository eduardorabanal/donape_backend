import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity
} from "typeorm";
import { GrupoNecesidad } from "./GrupoNecesidad";

@Entity("Usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("char", { length: 60 })
  password: string;

  @Column("varchar", { length: 255 })
  nombre: string;

  @Column("varchar", { length: 255 })
  apPaterno: string;

  @Column("varchar", { length: 255 })
  apMaterno: string;

  @Column("char", { length: 9 })
  celular: string;

  @OneToMany(() => GrupoNecesidad, grupoNecesidad => grupoNecesidad.usuarioId)
  gruposNecesidades: GrupoNecesidad[];
}
