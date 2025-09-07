import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      username: 'ahmety',
      email: 'ahmet.yilmaz@example.com',
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      username: 'mehmetd',
      email: 'mehmet.demir@example.com',
    },
    {
      id: 3,
      name: 'Ayşe Kaya',
      username: 'aysek',
      email: 'ayse.kaya@example.com',
    },
    {
      id: 4,
      name: 'Fatma Çelik',
      username: 'fatmac',
      email: 'fatma.celik@example.com',
    },
    {
      id: 5,
      name: 'Ali Şahin',
      username: 'alis',
      email: 'ali.sahin@example.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id:
        this.users.length > 0
          ? Math.max(...this.users.map((u) => u.id)) + 1
          : 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    console.log('Updating user with ID:', id, 'Data:', updateUserDto);
    console.log('Current users:', this.users);

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      console.log('User not found with ID:', id);
      throw new Error('User not found');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    console.log('Updated user:', this.users[userIndex]);
    return this.users[userIndex];
  }

  remove(id: number): void {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users.splice(userIndex, 1);
  }
}
