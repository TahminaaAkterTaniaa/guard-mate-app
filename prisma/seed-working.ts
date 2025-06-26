import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  console.log('🌱 Starting working database seeding...');

  // Add timeout to prevent hanging
  const timeout = setTimeout(() => {
    console.log('❌ Seeding timed out after 30 seconds');
    process.exit(1);
  }, 30000);

  try {
    console.log('🔌 Connecting to database...');
    await prisma.$connect();
    console.log('✅ Connected successfully');

    // Step 1: Create Companies
    console.log('📋 Creating companies...');
    const company1 = await prisma.company.create({
      data: {
        name: 'SecureGuard Solutions',
        address: '123 Security Blvd, New York, NY 10001',
        phoneNumber: '+1-555-SECURE',
        email: 'admin@secureguard.com',
      }
    });
    console.log('✅ Company 1 created:', company1.name);

    const company2 = await prisma.company.create({
      data: {
        name: 'Metro Security Services',
        address: '456 Metro Ave, New York, NY 10002',
        phoneNumber: '+1-555-METRO',
        email: 'contact@metrosecurity.com',
      }
    });
    console.log('✅ Company 2 created:', company2.name);

    // Step 2: Create Users
    console.log('📋 Creating users...');
    const admin = await prisma.user.create({
      data: {
        companyId: company1.id,
        firstName: 'John',
        lastName: 'Administrator',
        email: 'admin@secureguard.com',
        phoneNumber: '+1-555-2001',
        password: await bcrypt.hash('password123', 10),
        role: 'COMPANY_ADMIN',
        employeeId: 'SG-001',
        dateOfBirth: new Date('1980-01-15'),
        address: '100 Admin St, NY 10010',
        emergencyContact: 'Jane Administrator',
        emergencyPhone: '+1-555-2002',
        status: 'ACTIVE',
        isAvailable: true,
      }
    });
    console.log('✅ Admin user created:', admin.firstName, admin.lastName);

    const manager = await prisma.user.create({
      data: {
        companyId: company1.id,
        firstName: 'Sarah',
        lastName: 'Manager',
        email: 'sarah.manager@secureguard.com',
        phoneNumber: '+1-555-2003',
        password: await bcrypt.hash('password123', 10),
        role: 'MANAGER',
        employeeId: 'SG-002',
        dateOfBirth: new Date('1985-03-12'),
        address: '200 Manager Blvd, NY 10011',
        emergencyContact: 'Mike Manager',
        emergencyPhone: '+1-555-2004',
        status: 'ACTIVE',
        isAvailable: true,
      }
    });
    console.log('✅ Manager user created:', manager.firstName, manager.lastName);

    const guard = await prisma.user.create({
      data: {
        companyId: company1.id,
        firstName: 'Alex',
        lastName: 'Smith',
        email: 'alex.smith@secureguard.com',
        phoneNumber: '+1-555-2005',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'SG-003',
        dateOfBirth: new Date('1995-05-20'),
        address: '789 Guard St, NY 10012',
        emergencyContact: 'Maria Smith',
        emergencyPhone: '+1-555-2008',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['patrolling', 'crowd_control', 'first_aid']),
        certifications: JSON.stringify(['Security Guard License', 'CPR Certified']),
        hourlyRate: 18.50,
      }
    });
    console.log('✅ Guard user created:', guard.firstName, guard.lastName);

    // Step 3: Create Locations
    console.log('📋 Creating locations...');
    const location1 = await prisma.location.create({
      data: {
        companyId: company1.id,
        clientName: 'Manhattan Shopping Center',
        name: 'Manhattan Mall - Main Entrance',
        siteCode: 'MM-001',
        address: '789 Shopping Ave, Main Entrance, Manhattan, NY 10003',
        city: 'New York',
        contactPerson: 'Store Manager',
        contactPhone: '+1-555-MALL',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        gpsRadius: 100,
        qrCode: 'QR-MM-001-MAIN',
        isActive: true,
        instructions: 'Monitor main entrance, assist customers, patrol every 30 minutes',
        emergencyProcedure: 'Contact mall security and NYPD immediately',
      }
    });
    console.log('✅ Location 1 created:', location1.name);

    const location2 = await prisma.location.create({
      data: {
        companyId: company1.id,
        clientName: 'Corporate Tower Corp',
        name: 'Corporate Tower - Lobby',
        siteCode: 'CT-001',
        address: '321 Business St, Main Lobby, Financial District, NY 10004',
        city: 'New York',
        contactPerson: 'Building Manager',
        contactPhone: '+1-555-CORP',
        coordinates: { lat: 40.7074, lng: -74.0113 },
        gpsRadius: 80,
        qrCode: 'QR-CT-001-LOBBY',
        isActive: true,
        instructions: 'Professional appearance required, assist employees and visitors',
        emergencyProcedure: 'Follow corporate emergency protocols',
      }
    });
    console.log('✅ Location 2 created:', location2.name);

    // Step 4: Create Shifts
    console.log('📋 Creating shifts...');
    const shift1 = await prisma.shift.create({
      data: {
        companyId: company1.id,
        locationId: location1.id,
        name: 'Morning Shift - Main Entrance',
        startTime: new Date('2024-01-01T08:00:00Z'),
        endTime: new Date('2024-01-01T16:00:00Z'),
        duration: 480, // 8 hours in minutes
        requiredGuards: 1,
        requiredSkills: JSON.stringify(['patrolling', 'customer_service']),
        isRecurring: true,
        daysOfWeek: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
        baseRate: 20.00,
        overtimeRate: 30.00,
        isActive: true,
      }
    });
    console.log('✅ Shift 1 created:', shift1.name);

    // Step 5: Create Deployment
    console.log('📋 Creating deployment...');
    const deployment1 = await prisma.deployment.create({
      data: {
        companyId: company1.id,
        locationId: location1.id,
        shiftId: shift1.id,
        userId: guard.id,
        date: new Date('2024-01-15T00:00:00Z'),
        status: 'SCHEDULED',
        startTime: new Date('2024-01-15T08:00:00Z'),
        endTime: new Date('2024-01-15T16:00:00Z'),
        assignedBy: admin.id,
      }
    });
    console.log('✅ Deployment 1 created for guard:', guard.firstName, guard.lastName);

    // Step 6: Create Attendance Record
    console.log('📋 Creating attendance record...');
    const attendance1 = await prisma.attendance.create({
      data: {
        companyId: company1.id,
        userId: guard.id,
        deploymentId: deployment1.id,
        locationId: location1.id,
        checkInTime: new Date('2024-01-15T08:00:00Z'),
        checkOutTime: new Date('2024-01-15T16:00:00Z'),
        checkInMethod: 'QR_CODE',
        status: 'CHECKED_OUT',
      }
    });
    console.log('✅ Attendance record created');

    // Final verification
    const counts = {
      companies: await prisma.company.count(),
      users: await prisma.user.count(),
      locations: await prisma.location.count(),
      shifts: await prisma.shift.count(),
      deployments: await prisma.deployment.count(),
      attendance: await prisma.attendance.count(),
    };

    console.log('\n📊 Database Summary:');
    console.log(`- Companies: ${counts.companies}`);
    console.log(`- Users: ${counts.users}`);
    console.log(`- Locations: ${counts.locations}`);
    console.log(`- Shifts: ${counts.shifts}`);
    console.log(`- Deployments: ${counts.deployments}`);
    console.log(`- Attendance Records: ${counts.attendance}`);

    console.log('\n🔐 Test Login Credentials:');
    console.log('Admin: admin@secureguard.com / password123');
    console.log('Manager: sarah.manager@secureguard.com / password123');
    console.log('Guard: alex.smith@secureguard.com / password123');

    clearTimeout(timeout);
    console.log('\n✅ Working database seeding completed successfully!');

  } catch (error) {
    clearTimeout(timeout);
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    console.log('🔌 Disconnecting from database...');
    await prisma.$disconnect();
    console.log('✅ Disconnected successfully');
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e);
    process.exit(1);
  });
