import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...');

  // Create Companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'SecureGuard Solutions',
        address: '123 Security Blvd, New York, NY 10001',
        phoneNumber: '+1-555-SECURE',
        email: 'admin@secureguard.com',
      }
    }),
    prisma.company.create({
      data: {
        name: 'Metro Security Services',
        address: '456 Metro Ave, New York, NY 10002',
        phoneNumber: '+1-555-METRO',
        email: 'contact@metrosecurity.com',
      }
    })
  ]);

  console.log('✅ Companies created');

  // Create Users
  const users = await Promise.all([
    // SecureGuard Solutions Users
    prisma.user.create({
      data: {
        companyId: companies[0].id,
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
    }),
    prisma.user.create({
      data: {
        companyId: companies[0].id,
        firstName: 'Sarah',
        lastName: 'Manager',
        email: 'sarah.manager@secureguard.com',
        phoneNumber: '+1-555-2003',
        password: await bcrypt.hash('password123', 10),
        role: 'MANAGER',
        employeeId: 'SG-002',
        dateOfBirth: new Date('1985-03-20'),
        address: '200 Manager Ave, NY 10011',
        emergencyContact: 'Tom Manager',
        emergencyPhone: '+1-555-2004',
        status: 'ACTIVE',
        isAvailable: true,
      }
    }),
    prisma.user.create({
      data: {
        companyId: companies[0].id,
        firstName: 'Alex',
        lastName: 'Smith',
        email: 'alex.smith@secureguard.com',
        phoneNumber: '+1-555-3001',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'SG-101',
        dateOfBirth: new Date('1992-05-10'),
        address: '301 Guard St, NY 10012',
        emergencyContact: 'Maria Smith',
        emergencyPhone: '+1-555-3002',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['patrolling', 'crowd_control', 'first_aid']),
        certifications: JSON.stringify(['Security Guard License', 'CPR Certified']),
        hourlyRate: 18.50,
      }
    }),
    prisma.user.create({
      data: {
        companyId: companies[0].id,
        firstName: 'Jessica',
        lastName: 'Brown',
        email: 'jessica.brown@secureguard.com',
        phoneNumber: '+1-555-3003',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'SG-102',
        dateOfBirth: new Date('1990-08-25'),
        address: '302 Guard Ave, NY 10013',
        emergencyContact: 'Robert Brown',
        emergencyPhone: '+1-555-3004',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['surveillance', 'report_writing', 'emergency_response']),
        certifications: JSON.stringify(['Armed Guard License', 'First Aid Certified']),
        hourlyRate: 22.00,
      }
    }),
    prisma.user.create({
      data: {
        companyId: companies[0].id,
        firstName: 'David',
        lastName: 'Wilson',
        email: 'david.wilson@secureguard.com',
        phoneNumber: '+1-555-3005',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'SG-103',
        dateOfBirth: new Date('1988-12-03'),
        address: '303 Security Ln, NY 10014',
        emergencyContact: 'Linda Wilson',
        emergencyPhone: '+1-555-3006',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['access_control', 'customer_service', 'incident_response']),
        certifications: JSON.stringify(['Security Guard License', 'Customer Service Certified']),
        hourlyRate: 19.75,
      }
    }),
    prisma.user.create({
      data: {
        companyId: companies[0].id,
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily.johnson@secureguard.com',
        phoneNumber: '+1-555-3007',
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
    }),
    prisma.user.create({
      data: {
        companyId: companies[0].id,
        firstName: 'Michael',
        lastName: 'Davis',
        email: 'michael.davis@secureguard.com',
        phoneNumber: '+1-555-3009',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'SG-004',
        dateOfBirth: new Date('1988-08-10'),
        address: '456 Officer Ave, NY 10013',
        emergencyContact: 'Robert Johnson',
        emergencyPhone: '+1-555-2010',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['surveillance', 'report_writing', 'emergency_response']),
        certifications: JSON.stringify(['Armed Guard License', 'First Aid Certified']),
        hourlyRate: 22.00,
      }
    }),
    prisma.user.create({
      data: {
        companyId: companies[0].id,
        firstName: 'Jennifer',
        lastName: 'Taylor',
        email: 'jennifer.taylor@secureguard.com',
        phoneNumber: '+1-555-3011',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'SG-005',
        dateOfBirth: new Date('1992-03-25'),
        address: '123 Security Blvd, NY 10014',
        emergencyContact: 'Jennifer Davis',
        emergencyPhone: '+1-555-2012',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['access_control', 'customer_service', 'incident_response']),
        certifications: JSON.stringify(['Security Guard License', 'Customer Service Certified']),
        hourlyRate: 19.75,
      }
    }),
    // Metro Security Users
    prisma.user.create({
      data: {
        companyId: companies[1].id,
        firstName: 'Michael',
        lastName: 'Metro',
        email: 'admin@metrosecurity.com',
        phoneNumber: '+1-555-4001',
        password: await bcrypt.hash('password123', 10),
        role: 'COMPANY_ADMIN',
        employeeId: 'MS-001',
        dateOfBirth: new Date('1978-07-12'),
        address: '400 Metro St, NY 10015',
        emergencyContact: 'Susan Metro',
        emergencyPhone: '+1-555-4002',
        status: 'ACTIVE',
        isAvailable: true,
      }
    }),
    prisma.user.create({
      data: {
        companyId: companies[1].id,
        firstName: 'Maria',
        lastName: 'Rodriguez',
        email: 'maria.rodriguez@metrosecurity.com',
        phoneNumber: '+1-555-4003',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'MS-101',
        dateOfBirth: new Date('1991-04-18'),
        address: '401 Metro Ave, NY 10016',
        emergencyContact: 'Elena Rodriguez',
        emergencyPhone: '+1-555-4004',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['patrol', 'medical_support', 'crowd_management']),
        certifications: JSON.stringify(['Security Guard License', 'EMT Certified']),
        hourlyRate: 21.00,
      }
    }),
    prisma.user.create({
      data: {
        companyId: companies[1].id,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@metrosecurity.com',
        phoneNumber: '+1-555-4005',
        password: await bcrypt.hash('password123', 10),
        role: 'GUARD',
        employeeId: 'MS-003',
        dateOfBirth: new Date('1990-07-15'),
        address: '789 Metro St, NY 10016',
        emergencyContact: 'David Brown',
        emergencyPhone: '+1-555-2016',
        status: 'ACTIVE',
        isAvailable: true,
        skills: JSON.stringify(['patrol', 'medical_support', 'crowd_management']),
        certifications: JSON.stringify(['Security Guard License', 'EMT Certified']),
        hourlyRate: 21.00,
      }
    })
  ]);

  console.log('✅ Users created');

  // Create locations
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        companyId: companies[0].id,
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
    }),
    prisma.location.create({
      data: {
        companyId: companies[0].id,
        clientName: 'Manhattan Shopping Center',
        name: 'Manhattan Mall - Parking Garage',
        siteCode: 'MM-002',
        address: '789 Shopping Ave, Parking Level B1, Manhattan, NY 10003',
        city: 'New York',
        contactPerson: 'Parking Manager',
        contactPhone: '+1-555-PARK',
        coordinates: { lat: 40.7120, lng: -74.0058 },
        gpsRadius: 150,
        qrCode: 'QR-MM-002-PARKING',
        isActive: true,
        instructions: 'Monitor vehicle access, check parking permits',
        emergencyProcedure: 'In case of emergency, secure all vehicle exits first',
      }
    }),
    prisma.location.create({
      data: {
        companyId: companies[0].id,
        clientName: 'Financial District Corp',
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
    }),
    prisma.location.create({
      data: {
        companyId: companies[1].id,
        clientName: 'New York Medical Center',
        name: 'City Hospital - Emergency Department',
        siteCode: 'CH-001',
        address: '654 Health Blvd, Emergency Wing, Medical District, NY 10005',
        city: 'New York',
        contactPerson: 'ER Director',
        contactPhone: '+1-555-HEALTH',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        gpsRadius: 200,
        qrCode: 'QR-CH-001-ER',
        isActive: true,
        instructions: 'Control access to restricted medical areas',
        emergencyProcedure: 'Medical emergency protocols, coordinate with medical staff',
      }
    })
  ]);

  console.log('✅ Locations created');

  // Create Shifts
  const shifts = await Promise.all([
    prisma.shift.create({
      data: {
        companyId: companies[0].id,
        locationId: locations[0].id,
        name: 'Morning Shift',
        startTime: '06:00',
        endTime: '14:00',
        duration: 480, // 8 hours in minutes
        baseRate: 22.50,
        overtimeRate: 33.75,
        requiredGuards: 1,
        isRecurring: true,
        daysOfWeek: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      }
    }),
    prisma.shift.create({
      data: {
        companyId: companies[0].id,
        locationId: locations[0].id,
        name: 'Evening Shift',
        startTime: '14:00',
        endTime: '22:00',
        duration: 480, // 8 hours in minutes
        baseRate: 24.00,
        overtimeRate: 36.00,
        requiredGuards: 1,
        isRecurring: true,
        daysOfWeek: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      }
    }),
    prisma.shift.create({
      data: {
        companyId: companies[0].id,
        locationId: locations[0].id,
        name: 'Night Shift',
        startTime: '22:00',
        endTime: '06:00',
        duration: 480, // 8 hours in minutes
        baseRate: 26.00,
        overtimeRate: 39.00,
        requiredGuards: 1,
        isRecurring: true,
        daysOfWeek: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      }
    }),
    prisma.shift.create({
      data: {
        companyId: companies[0].id,
        locationId: locations[2].id,
        name: 'Corporate Day Shift',
        startTime: '07:00',
        endTime: '19:00',
        duration: 720, // 12 hours in minutes
        baseRate: 28.00,
        overtimeRate: 42.00,
        requiredGuards: 1,
        isRecurring: true,
        daysOfWeek: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
      }
    }),
    prisma.shift.create({
      data: {
        companyId: companies[1].id,
        locationId: locations[3].id,
        name: 'Hospital Security 24/7',
        startTime: '00:00',
        endTime: '12:00',
        duration: 720, // 12 hours in minutes
        baseRate: 25.00,
        overtimeRate: 37.50,
        requiredGuards: 1,
        isRecurring: true,
        daysOfWeek: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']),
      }
    })
  ]);

  console.log('✅ Shifts created');

  // Create Deployments (Scheduled guard assignments)
  const today = new Date();
  const deployments = [];
  
  // Create deployments for the next 30 days
  for (let i = 0; i < 30; i++) {
    const deploymentDate = new Date(today);
    deploymentDate.setDate(today.getDate() + i);
    
    // Create start and end times for deployments
    const morningStart = new Date(deploymentDate);
    morningStart.setHours(6, 0, 0, 0);
    const morningEnd = new Date(deploymentDate);
    morningEnd.setHours(14, 0, 0, 0);
    
    const eveningStart = new Date(deploymentDate);
    eveningStart.setHours(14, 0, 0, 0);
    const eveningEnd = new Date(deploymentDate);
    eveningEnd.setHours(22, 0, 0, 0);
    
    const nightStart = new Date(deploymentDate);
    nightStart.setHours(22, 0, 0, 0);
    const nightEnd = new Date(deploymentDate);
    nightEnd.setDate(nightEnd.getDate() + 1);
    nightEnd.setHours(6, 0, 0, 0);
    
    // Morning shift deployments
    deployments.push(
      prisma.deployment.create({
        data: {
          companyId: companies[0].id,
          locationId: locations[0].id,
          shiftId: shifts[0].id,
          userId: users[2].id, // Alex Smith
          date: deploymentDate,
          startTime: morningStart,
          endTime: morningEnd,
          status: i < 5 ? 'COMPLETED' : (i < 10 ? 'CONFIRMED' : 'SCHEDULED'),
          notes: i < 5 ? 'Shift completed successfully' : 'Standard mall security coverage',
        }
      }),
      // Evening shift deployments  
      prisma.deployment.create({
        data: {
          companyId: companies[0].id,
          locationId: locations[0].id,
          shiftId: shifts[1].id,
          userId: users[3].id, // Jessica Brown
          date: deploymentDate,
          startTime: eveningStart,
          endTime: eveningEnd,
          status: i < 5 ? 'COMPLETED' : (i < 10 ? 'CONFIRMED' : 'SCHEDULED'),
          notes: i < 5 ? 'Evening shift completed, all procedures followed' : 'Evening security coverage',
        }
      })
    );
    
    // Weekend night shifts
    if (deploymentDate.getDay() === 5 || deploymentDate.getDay() === 6) {
      deployments.push(
        prisma.deployment.create({
          data: {
            companyId: companies[0].id,
            locationId: locations[0].id,
            shiftId: shifts[2].id,
            userId: users[4].id, // David Wilson
            date: deploymentDate,
            startTime: nightStart,
            endTime: nightEnd,
            status: i < 5 ? 'COMPLETED' : 'SCHEDULED',
            notes: 'Weekend night security coverage',
          }
        })
      );
    }
  }

  await Promise.all(deployments);
  console.log('✅ Deployments created');

  // Create Attendance Records
  const attendanceRecords = [];
  
  // Create attendance for the past 10 days for completed deployments
  for (let i = 1; i <= 10; i++) {
    const attendanceDate = new Date(today);
    attendanceDate.setDate(today.getDate() - i);
    
    const morningCheckIn = new Date(attendanceDate);
    morningCheckIn.setHours(6, 0, 0, 0);
    const morningCheckOut = new Date(attendanceDate);
    morningCheckOut.setHours(14, 15, 0, 0);
    
    const eveningCheckIn = new Date(attendanceDate);
    eveningCheckIn.setHours(13, 55, 0, 0);
    const eveningCheckOut = new Date(attendanceDate);
    eveningCheckOut.setHours(22, 10, 0, 0);
    
    attendanceRecords.push(
      // Morning shift attendance
      prisma.attendance.create({
        data: {
          companyId: companies[0].id,
          locationId: locations[0].id,
          userId: users[2].id,
          deploymentId: (await prisma.deployment.findFirst({
            where: {
              userId: users[2].id,
              date: attendanceDate,
              shiftId: shifts[0].id
            }
          }))?.id || '',
          checkInTime: morningCheckIn,
          checkOutTime: morningCheckOut,
          checkInCoordinates: { lat: 40.7505, lng: -73.9845 },
          checkOutCoordinates: { lat: 40.7505, lng: -73.9845 },
          checkInMethod: 'QR_CODE',
          checkOutMethod: 'QR_CODE',
          hoursWorked: 8.25,
          overtimeHours: 0.25,
          status: 'CHECKED_OUT',
          isGpsValid: true,
          isQrValid: true,
          requiresApproval: false,
        }
      }),
      // Evening shift attendance
      prisma.attendance.create({
        data: {
          companyId: companies[0].id,
          locationId: locations[0].id,
          userId: users[3].id,
          deploymentId: (await prisma.deployment.findFirst({
            where: {
              userId: users[3].id,
              date: attendanceDate,
              shiftId: shifts[1].id
            }
          }))?.id || '',
          checkInTime: eveningCheckIn,
          checkOutTime: eveningCheckOut,
          checkInCoordinates: { lat: 40.7505, lng: -73.9845 },
          checkOutCoordinates: { lat: 40.7505, lng: -73.9845 },
          checkInMethod: 'GPS_ONLY',
          checkOutMethod: 'GPS_ONLY',
          hoursWorked: 8.25,
          overtimeHours: 0.25,
          status: 'CHECKED_OUT',
          isGpsValid: true,
          isQrValid: false,
          requiresApproval: false,
        }
      })
    );
  }

  await Promise.all(attendanceRecords);
  console.log('✅ Attendance records created');

  console.log('🎉 Comprehensive database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- ${companies.length} Companies created`);
  console.log(`- ${users.length} Users created (Admins, Managers, Guards)`);
  console.log(`- ${locations.length} Locations created`);
  console.log(`- ${shifts.length} Shifts created`);
  console.log(`- 60 Deployments created (30 days × 2 shifts)`);
  console.log(`- 20 Attendance records created`);
  console.log('\n🔐 Test Login Credentials:');
  console.log('Admin: admin@secureguard.com / password123');
  console.log('Manager: sarah.manager@secureguard.com / password123');
  console.log('Guard: alex.smith@secureguard.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
