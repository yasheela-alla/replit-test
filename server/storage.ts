import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(email: string, password: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
    // Initialize with demo users for the three roles
    this.seedUsers();
  }

  private seedUsers() {
    const demoUsers: User[] = [
      {
        id: "1",
        email: "manager@company.com",
        password: "manager123",
        role: "manager",
        name: "Sarah Johnson"
      },
      {
        id: "2", 
        email: "creative@company.com",
        password: "creative123",
        role: "creative_team",
        name: "Alex Chen"
      },
      {
        id: "3",
        email: "marketing@company.com", 
        password: "marketing123",
        role: "digital_marketer",
        name: "Maria Rodriguez"
      }
    ];

    demoUsers.forEach(user => {
      this.users.set(user.id, user);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
