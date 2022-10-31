import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm"
import { Properties } from "./properties.entity"

@Entity()
export class Categories {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({ unique: true, length: 128 })
    name: string

    @OneToMany((type) => Properties, (properties) => properties.category)
    properties: Properties[]
}