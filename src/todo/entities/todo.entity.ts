import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  date: string;
  @Column()
  completed: boolean;

  // Many todos can belong to single user
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
