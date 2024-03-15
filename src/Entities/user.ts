import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  category: string;

  @Column({length: 10})
  phone_number: string;

  @Column({ default: 'USER'})
  role: string;
}
