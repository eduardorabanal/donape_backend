import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany
} from "typeorm";
import { DonacionEstado } from "./DonacionEstado";

@Entity("imagen_estado")
export class ImagenEstado extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  url: string;

  @ManyToMany(() => DonacionEstado)
  donacionEstados: DonacionEstado[];
}
