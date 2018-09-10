import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("Imagenes")
export class Imagen extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
