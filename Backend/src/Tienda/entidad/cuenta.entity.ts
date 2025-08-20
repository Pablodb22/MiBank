import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cuenta')
export class Cuenta {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        id_usuario: number;

        @Column()
        descripcion: string;

        @Column()
        transaccion: number;

        @Column()
        total: number;

        @Column()
        fecha: Date;
    
        
}