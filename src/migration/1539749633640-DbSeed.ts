import { MigrationInterface, QueryRunner } from "typeorm";
import { Publicacion } from "../entity/Publicacion";
import { Usuario } from "../entity/Usuario";
import * as bcrypt from "bcrypt";
import { Estado } from "../entity/Estado";
import { Necesidad } from "../entity/Necesidad";
import { Donacion } from "../entity/Donacion";
import { DonacionEstado } from "../entity/DonacionEstado";
import { ImagenEstado } from "../entity/ImagenEstado";
import { ImagenPublicacion } from "../entity/ImagenPublicacion";

export class DbSeed1539749633640 implements MigrationInterface {
  public async up(): Promise<any> {
    const usuario = await this.crearYObtenerUsuario();
    const estados = await this.crearYObtenerEstados();

    const publicacion = await this.crearYObtenerPublicacion(usuario);
    await this.crearImagenesPublicacion(publicacion);

    const necesidades = await this.crearYObtenerNecesidades(publicacion, 4);
    const donacion = await this.crearYObtenerDonacion(necesidades[0], usuario);

    const imagenEstado = await this.crearYObtenerImagenEstado();
    await this.crearYObtenerDonacionEstado(
      donacion,
      estados.pendiente,
      imagenEstado
    );
  }

  async crearYObtenerUsuario(): Promise<Usuario> {
    return await Usuario.create({
      nombre: "Ramira",
      email: "la@ra.com",
      password: await bcrypt.hash("larami", 10),
      celular: "934465807"
    }).save();
  }

  async crearYObtenerEstados(): Promise<any> {
    const pendiente = await Estado.create({
      id: "PN",
      nombre: "Pendiente"
    }).save();

    const confirmada = await Estado.create({
      id: "CN",
      nombre: "Confirmada",
      actualizaNecesidad: true
    }).save();

    const entregada = await Estado.create({
      id: "EN",
      nombre: "Entregada"
    }).save();

    return {
      pendiente,
      confirmada,
      entregada
    };
  }

  async crearYObtenerPublicacion(usuario: Usuario): Promise<Publicacion> {
    return await Publicacion.create({
      titulo: "Se necesita ayuda",
      descripcion: "Ayuda por favor",
      usuario
    }).save();
  }

  async crearImagenesPublicacion(publicacion: Publicacion): Promise<void> {
    await ImagenPublicacion.create({
      url:
        "http://m.vanguardia.com/images/stories/2009/dic/13/santander/13BARRA01E022_MED.jpg",
      publicacion
    }).save();

    await ImagenPublicacion.create({
      url: "https://i.ytimg.com/vi/RfYjVIZ0H3M/maxresdefault.jpg",
      publicacion
    }).save();
  }

  async crearYObtenerNecesidades(
    publicacion: Publicacion,
    cantidad: number
  ): Promise<Necesidad[]> {
    const necesidades: Necesidad[] = [];

    for (let i = 1; i <= cantidad; i++) {
      necesidades.push(
        await this.crearYObtenerNecesidad(publicacion, `pantalones talla 3${i}`)
      );
    }

    return necesidades;
  }

  async crearYObtenerNecesidad(
    publicacion: Publicacion,
    articulo: string
  ): Promise<Necesidad> {
    return await Necesidad.create({
      articulo,
      cantidadRequerida: 20,
      publicacion
    }).save();
  }

  async crearYObtenerDonacion(
    necesidad: Necesidad,
    usuario: Usuario
  ): Promise<Donacion> {
    return await Donacion.create({
      articuloRequerido: necesidad.articulo,
      articuloDonado: "pantaloneta",
      necesidad,
      cantidad: necesidad.cantidadRequerida / 2,
      usuario
    }).save();
  }

  async crearYObtenerImagenEstado(): Promise<ImagenEstado> {
    return await ImagenEstado.create({
      nombre: "foto casa",
      url:
        "http://m.vanguardia.com/images/stories/2009/dic/13/santander/13BARRA01E022_MED.jpg"
    }).save();
  }

  async crearYObtenerDonacionEstado(
    donacion: Donacion,
    estado: Estado,
    imagenEstado: ImagenEstado
  ): Promise<DonacionEstado> {
    return await DonacionEstado.create({
      donacion,
      estado,
      imagenes: [imagenEstado]
    }).save();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.deleteDataFromTables(
      [
        "donacion_estado_imagen",
        "donacion_estado",
        "estado",
        "imagen_estado",
        "imagen_publicacion",
        "donacion",
        "necesidad",
        "publicacion",
        "usuario"
      ],
      queryRunner
    );
  }

  private async deleteDataFromTables(
    tableNames: string[],
    queryRunner: QueryRunner
  ): Promise<any> {
    tableNames.forEach(async tableName => {
      await queryRunner.query(`DELETE FROM ${tableName};`);
    });
  }
}
