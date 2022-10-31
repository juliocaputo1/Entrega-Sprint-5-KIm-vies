import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"

@Entity()
export class Addresses {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    district: string

    @Column({ length: 8 })
    zipCode: string

    @Column({ nullable: true })
    number: string

    @Column()
    city: string

    @Column({ length: 2 })
    state: string
}