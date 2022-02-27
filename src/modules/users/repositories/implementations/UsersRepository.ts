import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: IUsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): IUsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();
    Object.assign(newUser, { name, email });
    this.users.push(newUser);
    return newUser;
  }

  findById(id: string): User | undefined {
    const findUser = this.users.find((user) => user.id === id);

    if (!findUser) {
      return undefined;
    }

    return findUser;
  }

  findByEmail(email: string): User | undefined {
    const findUser = this.users.find((user) => user.email === email);

    if (!findUser) {
      return undefined;
    }

    return findUser;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    this.users[userIndex].admin = true;
    this.users[userIndex].updated_at = new Date();

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
