import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed data creation...');

  // Create a test company
  const company = await prisma.company.upsert({
    where: { id: 'cltest123company' },
    update: {},
    create: {
      id: 'cltest123company',
      name: 'GuardMate Security Inc.',
      logoUrl: '/logo.png',
    },
  });

  console.log(`Created company: ${company.name}`);

  // Create a test site
  const site = await prisma.site.upsert({
    where: { id: 'cltest123site' },
    update: {},
    create: {
      id: 'cltest123site',
      companyId: company.id,
      name: 'Downtown Office Building',
      address: '123 Main Street, Downtown',
      latitude: 37.7749,
      longitude: -122.4194,
      qrCodeUrl: '/qr-codes/downtown-office.png',
    },
  });

  console.log(`Created site: ${site.name}`);

  // Create a test manager
  const hashedManagerPassword = await bcrypt.hash('manager123', 10);
  const manager = await prisma.manager.upsert({
    where: { email: 'manager@guardmate.com' },
    update: {},
    create: {
      id: 'cltest123manager',
      companyId: company.id,
      email: 'manager@guardmate.com',
      phone: '5551234567',
      name: 'Alex Manager',
      password: hashedManagerPassword,
      role: 'ADMIN',
      profilePictureUrl: '/profiles/manager.jpg',
    },
  });

  console.log(`Created manager: ${manager.name}`);

  // Create test guards
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const guard1 = await prisma.guard.upsert({
    where: { phone: '5559876543' },
    update: {},
    create: {
      id: 'cltest123guard1',
      companyId: company.id,
      email: 'john@guardmate.com',
      phone: '5559876543',
      password: hashedPassword,
      name: 'John Smith',
      status: 'ACTIVE',
      profilePictureUrl: '/profiles/john.jpg',
    },
  });

  console.log(`Created guard: ${guard1.name}`);

  const guard2 = await prisma.guard.upsert({
    where: { phone: '5558765432' },
    update: {},
    create: {
      id: 'cltest123guard2',
      companyId: company.id,
      email: 'sarah@guardmate.com',
      phone: '5558765432',
      password: hashedPassword,
      name: 'Sarah Johnson',
      status: 'ACTIVE',
      profilePictureUrl: '/profiles/sarah.jpg',
    },
  });

  console.log(`Created guard: ${guard2.name}`);

  // Create a deployment
  const now = new Date();
  const oneWeekFromNow = new Date(now);
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

  const deployment = await prisma.deployment.upsert({
    where: { id: 'cltest123deployment' },
    update: {},
    create: {
      id: 'cltest123deployment',
      companyId: company.id,
      guardId: guard1.id,
      siteId: site.id,
      startDate: now,
      endDate: oneWeekFromNow,
      status: 'ACTIVE',
    },
  });

  console.log(`Created deployment for ${guard1.name} at ${site.name}`);

  // Create a check-in
  const checkIn = await prisma.checkIn.upsert({
    where: { id: 'cltest123checkin' },
    update: {},
    create: {
      id: 'cltest123checkin',
      guardId: guard1.id,
      siteId: site.id,
      checkInTime: new Date(),
      status: 'CHECKED_IN',
      latitude: 37.7749,
      longitude: -122.4194,
      qrCodeVerified: true
    },
  });

  console.log(`Created check-in for ${guard1.name}`);

  console.log('Seed data creation completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
