import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { GrupoNecesidad } from "./GrupoNecesidad";

@Entity("Necesidades")
export class Necesidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articulo: string;

  @Column()
  cantidad: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => GrupoNecesidad, grupoId => grupoId.necesidades)
  grupo: GrupoNecesidad;
}
