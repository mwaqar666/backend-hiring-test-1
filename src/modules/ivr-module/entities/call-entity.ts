import { BaseEntity } from "@/base";
import { Nullable } from "@/types";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CallEntity extends BaseEntity<CallEntity> {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	public callId: number;

	@Column({ type: "varchar", length: 100, nullable: false, unique: true })
	public callSid: string;

	@Column({ type: "varchar", length: 100, nullable: false })
	public callAccountSid: string;

	@Column({ type: "varchar", nullable: true })
	public callVoicemailUrl: Nullable<string>;

	@Column({ type: "varchar", length: 50 })
	public callStatus: string;

	@CreateDateColumn()
	public callCreatedAt: string;

	@UpdateDateColumn()
	public callUpdatedAt: string;

	@DeleteDateColumn()
	public callDeletedAt: Nullable<string>;
}
