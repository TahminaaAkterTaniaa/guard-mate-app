import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
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
      phoneNumber: '5551234567',
      email: 'info@guardmate.com',
    },
  });

  console.log(`Created company: ${company.name}`);

  // Create a test location
  const location = await prisma.location.upsert({
    where: { siteCode: 'DOWNTOWN001' },
    update: {},
    create: {
      id: 'cltest123location',
      companyId: company.id,
      name: 'Downtown Office Building',
      address: '123 Main Street, Downtown',
      city: 'New York',
      siteCode: 'DOWNTOWN001',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      qrCode: '/qr-codes/downtown-office.png',
    },
  });

  console.log(`Created location: ${location.name}`);

  // Create a test admin user
  const hashedManagerPassword = await bcrypt.hash('manager123', 10);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@guardmate.com' },
    update: {},
    create: {
      id: 'cltest123manager',
      companyId: company.id,
      firstName: 'Alex',
      lastName: 'Manager',
      email: 'manager@guardmate.com',
      phoneNumber: '5551234567',
      password: hashedManagerPassword,
      role: UserRole.COMPANY_ADMIN,
      status: UserStatus.ACTIVE,
      avatar: '/profiles/manager.jpg',
    },
  });

  console.log(`Created manager: ${manager.firstName} ${manager.lastName}`);

  // Create test guard users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const guard1 = await prisma.user.upsert({
    where: { email: 'john@guardmate.com' },
    update: {},
    create: {
      id: 'cltest123guard1',
      companyId: company.id,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@guardmate.com',
      phoneNumber: '5559876543',
      password: hashedPassword,
      role: UserRole.GUARD,
      status: UserStatus.ACTIVE,
      avatar: '/images/profile1.jpeg',
      skills: JSON.stringify(['Security', 'First Aid']),
      certifications: JSON.stringify(['Security License', 'CPR']),
      hourlyRate: 15.0,
    },
  });

  console.log(`Created guard: ${guard1.firstName} ${guard1.lastName}`);

  const guard2 = await prisma.user.upsert({
    where: { email: 'sarah@guardmate.com' },
    update: {},
    create: {
      id: 'cltest123guard2',
      companyId: company.id,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@guardmate.com',
      phoneNumber: '5558765432',
      password: hashedPassword,
      role: UserRole.GUARD,
      status: UserStatus.ACTIVE,
      avatar: '/images/profile2.jpg',
      skills: JSON.stringify(['Access Control', 'Surveillance']),
      certifications: JSON.stringify(['Security License']),
      hourlyRate: 16.0,
    },
  });

  console.log(`Created guard: ${guard2.firstName} ${guard2.lastName}`);

  // Create a shift
  const now = new Date();
  const shiftStart = new Date(now);
  shiftStart.setHours(9, 0, 0, 0);
  
  const shiftEnd = new Date(now);
  shiftEnd.setHours(17, 0, 0, 0);

  const shift = await prisma.shift.upsert({
    where: { id: 'cltest123shift' },
    update: {},
    create: {
      id: 'cltest123shift',
      companyId: company.id,
      locationId: location.id,
      name: 'Day Shift',
      startTime: shiftStart,
      endTime: shiftEnd,
      duration: 480, // 8 hours in minutes
      requiredGuards: 1,
      requiredSkills: JSON.stringify(['Security', 'First Aid']),
    },
  });

  console.log(`Created shift: ${shift.name}`);

  // Create a deployment
  const deploymentDate = new Date(now);
  deploymentDate.setHours(0, 0, 0, 0);

  const deployment = await prisma.deployment.upsert({
    where: { id: 'cltest123deployment' },
    update: {},
    create: {
      id: 'cltest123deployment',
      companyId: company.id,
      userId: guard1.id,
      shiftId: shift.id,
      locationId: location.id,
      date: deploymentDate,
      startTime: shiftStart,
      endTime: shiftEnd,
      status: 'SCHEDULED',
    },
  });

  console.log(`Created deployment for ${guard1.firstName} at ${location.name}`);

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
