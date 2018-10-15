import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("imagen_estado")
export class ImagenEstado extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  url: string;
}
