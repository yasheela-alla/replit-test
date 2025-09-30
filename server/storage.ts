import { type User, type InsertUser, type Task, type InsertTask, type TaskComment, type InsertTaskComment, type Campaign, type InsertCampaign } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(email: string, password: string): Promise<User | null>;
  
  // Task methods
  getTasks(filters?: { status?: string; assigneeId?: string; createdById?: string }): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask & { createdById: string }): Promise<Task>;
  updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  
  // Task comment methods
  getTaskComments(taskId: string): Promise<TaskComment[]>;
  addTaskComment(comment: InsertTaskComment & { userId: string }): Promise<TaskComment>;
  
  // Campaign methods
  getCampaigns(filters?: { status?: string; platform?: string }): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign & { createdById: string }): Promise<Campaign>;
  updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tasks: Map<string, Task>;
  private taskComments: Map<string, TaskComment>;
  private campaigns: Map<string, Campaign>;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.taskComments = new Map();
    this.campaigns = new Map();
    // Initialize with demo data
    this.seedUsers();
    this.seedTasks();
    this.seedCampaigns();
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

  private seedTasks() {
    const now = new Date().toISOString();
    const demoTasks: Task[] = [
      {
        id: "task-1",
        title: "New store awareness campaign",
        requirement: "Create promotional video for Bhimavaram branch opening", 
        contentType: "video",
        campaign: "Store Opening",
        dueDate: "2025-10-15",
        priority: "high",
        status: "in_review",
        assigneeId: "1",
        createdById: "2",
        branchSpecific: "Bhimavaram",
        format: "1350 x 1080 PX",
        eventBased: "Store Opening",
        reference: null,
        thumbnailUrl: "/api/placeholder/400/300",
        tags: ["promotional", "video", "store-opening"],
        createdAt: now,
        updatedAt: now
      },
      {
        id: "task-2",
        title: "Festival collection showcase",
        requirement: "Design carousel for Diwali jewelry collection",
        contentType: "carousel",
        campaign: "Diwali 2025",
        dueDate: "2025-10-20",
        priority: "medium",
        status: "draft",
        assigneeId: "2",
        createdById: "3",
        branchSpecific: "All Branches",
        format: "Square 1080x1080",
        eventBased: "Diwali",
        reference: null,
        thumbnailUrl: "/api/placeholder/400/300",
        tags: ["festival", "carousel", "jewelry"],
        createdAt: now,
        updatedAt: now
      },
      {
        id: "task-3",
        title: "Wedding collection promo",
        requirement: "Create image assets for wedding jewelry campaign",
        contentType: "image",
        campaign: "Wedding Season",
        dueDate: "2025-10-10",
        priority: "urgent",
        status: "approved",
        assigneeId: "2",
        createdById: "1",
        branchSpecific: "Hyderabad",
        format: "Portrait 1080x1350",
        eventBased: "Wedding Season",
        reference: null,
        thumbnailUrl: "/api/placeholder/400/300",
        tags: ["wedding", "image", "jewelry"],
        createdAt: now,
        updatedAt: now
      }
    ];

    demoTasks.forEach(task => {
      this.tasks.set(task.id, task);
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
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role as 'manager' | 'creative_team' | 'digital_marketer'
    };
    this.users.set(id, user);
    return user;
  }

  // Task methods implementation
  async getTasks(filters?: { status?: string; assigneeId?: string; createdById?: string }): Promise<Task[]> {
    let tasks = Array.from(this.tasks.values());
    
    if (filters?.status) {
      tasks = tasks.filter(task => task.status === filters.status);
    }
    if (filters?.assigneeId) {
      tasks = tasks.filter(task => task.assigneeId === filters.assigneeId);
    }
    if (filters?.createdById) {
      tasks = tasks.filter(task => task.createdById === filters.createdById);
    }
    
    return tasks.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(taskData: InsertTask & { createdById: string }): Promise<Task> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const task: Task = {
      title: taskData.title,
      requirement: taskData.requirement,
      contentType: taskData.contentType as 'image' | 'video' | 'carousel' | 'text',
      priority: (taskData.priority || 'medium') as 'low' | 'medium' | 'high' | 'urgent',
      campaign: taskData.campaign || null,
      dueDate: taskData.dueDate || null,
      assigneeId: taskData.assigneeId || null,
      branchSpecific: taskData.branchSpecific || null,
      format: taskData.format || null,
      eventBased: taskData.eventBased || null,
      reference: taskData.reference || null,
      thumbnailUrl: null,
      tags: taskData.tags || null,
      id,
      status: 'draft',
      createdById: taskData.createdById,
      createdAt: now,
      updatedAt: now
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  // Task comment methods
  async getTaskComments(taskId: string): Promise<TaskComment[]> {
    return Array.from(this.taskComments.values())
      .filter(comment => comment.taskId === taskId)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
  }

  async addTaskComment(commentData: InsertTaskComment & { userId: string }): Promise<TaskComment> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const comment: TaskComment = {
      ...commentData,
      id,
      createdAt: now
    };
    this.taskComments.set(id, comment);
    return comment;
  }

  // Campaign seed data
  private seedCampaigns() {
    const now = new Date().toISOString();
    const demoCampaigns: Campaign[] = [
      {
        id: "campaign-1",
        name: "Diwali Collection Launch",
        platform: "instagram",
        startDate: "2025-10-01",
        endDate: "2025-10-31",
        budget: "50000",
        spent: "32450",
        status: "active",
        reach: "125000",
        impressions: "342000",
        engagement: "28500",
        conversions: "1250",
        createdById: "1",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "campaign-2",
        name: "Wedding Season Showcase",
        platform: "facebook",
        startDate: "2025-09-15",
        endDate: "2025-12-31",
        budget: "75000",
        spent: "45300",
        status: "active",
        reach: "210000",
        impressions: "580000",
        engagement: "42000",
        conversions: "2100",
        createdById: "3",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "campaign-3",
        name: "Store Opening Promotion",
        platform: "youtube",
        startDate: "2025-10-10",
        endDate: "2025-10-20",
        budget: "30000",
        spent: "18500",
        status: "active",
        reach: "85000",
        impressions: "195000",
        engagement: "12500",
        conversions: "650",
        createdById: "2",
        createdAt: now,
        updatedAt: now
      },
      {
        id: "campaign-4",
        name: "Festive Collection Teaser",
        platform: "instagram",
        startDate: "2025-11-01",
        endDate: null,
        budget: "40000",
        spent: "0",
        status: "scheduled",
        reach: "0",
        impressions: "0",
        engagement: "0",
        conversions: "0",
        createdById: "1",
        createdAt: now,
        updatedAt: now
      }
    ];

    demoCampaigns.forEach(campaign => {
      this.campaigns.set(campaign.id, campaign);
    });
  }

  // Campaign methods implementation
  async getCampaigns(filters?: { status?: string; platform?: string }): Promise<Campaign[]> {
    let campaigns = Array.from(this.campaigns.values());
    
    if (filters?.status) {
      campaigns = campaigns.filter(campaign => campaign.status === filters.status);
    }
    if (filters?.platform) {
      campaigns = campaigns.filter(campaign => campaign.platform === filters.platform);
    }
    
    return campaigns.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(campaignData: InsertCampaign & { createdById: string }): Promise<Campaign> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const campaign: Campaign = {
      name: campaignData.name,
      platform: campaignData.platform as 'instagram' | 'facebook' | 'youtube' | 'twitter' | 'linkedin' | 'tiktok',
      startDate: campaignData.startDate,
      endDate: campaignData.endDate || null,
      budget: campaignData.budget || null,
      spent: campaignData.spent || null,
      status: (campaignData.status || 'active') as 'active' | 'scheduled' | 'completed' | 'paused',
      reach: campaignData.reach || null,
      impressions: campaignData.impressions || null,
      engagement: campaignData.engagement || null,
      conversions: campaignData.conversions || null,
      id,
      createdById: campaignData.createdById,
      createdAt: now,
      updatedAt: now
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = {
      ...campaign,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }
}

export const storage = new MemStorage();
