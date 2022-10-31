import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm"
import { Addresses } from "./adresses.entity"
import { Categories } from "./categories.entity"
import { Schedules } from "./schedules.entity"

@Entity()
export class Properties {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({ default: false })
    sold: boolean

    @Column()
    value: number

    @Column({ type: "int" })
    size: number

    @OneToOne((type) => Addresses, { eager: true, onDelete: "CASCADE", nullable: false })
    @JoinColumn()
    address: Addresses

    @ManyToOne((type) => Categories, (categories) => categories.properties, { onDelete: "SET NULL", eager: true })
    category: Categories

    @OneToMany((type) => Schedules, (schedules) => schedules.property, { eager: true })
    schedules: Schedules[]

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date

    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date
}