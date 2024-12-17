import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  ip: string;

  @Column({ type: "bigint" })
  limit: number;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    select: false,
  })
  createdAt: Date;

  @Column({ select: false })
  createdBy: string;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
    select: false,
  })
  updatedAt: Date;

  @Column({ select: false })
  updatedBy: string;

  getClient() {
    return { id: this.id, name: this.name, ip: this.ip, limit: this.limit };
  }
}
