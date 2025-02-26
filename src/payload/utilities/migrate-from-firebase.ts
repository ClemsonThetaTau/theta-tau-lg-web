/**
 * This script helps migrate data from Firebase to Payload CMS
 * 
 * To use this script:
 * 1. Make sure you have both Firebase and Payload CMS set up
 * 2. Run this script with Node.js
 * 
 * Example:
 * ```
 * npx ts-node src/payload/utilities/migrate-from-firebase.ts
 * ```
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getPayloadClient } from '../payload';
import { firebaseConfig } from '../../firebase/config';

// Define types for Firebase user data
interface FirebaseUser extends DocumentData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  major?: string;
  badgeNumber?: string;
  pledgeClass?: string;
  status?: string;
  phone?: string;
  graduationYear?: number;
  [key: string]: any; // Allow for additional properties
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function migrateUsers() {
  try {
    console.log('Starting user migration...');
    
    // Get Payload client
    const payload = await getPayloadClient();
    
    // Get all users from Firebase
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseUser[];
    
    console.log(`Found ${users.length} users in Firebase`);
    
    // Migrate each user to Payload CMS
    for (const user of users) {
      try {
        // Check if user already exists in Payload
        const existingUsers = await payload.find({
          collection: 'users',
          where: {
            email: { equals: user.email },
          },
        });
        
        if (existingUsers.docs.length > 0) {
          console.log(`User ${user.email} already exists in Payload CMS, skipping...`);
          continue;
        }
        
        // Create user in Payload CMS
        const newUser = await payload.create({
          collection: 'users',
          data: {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role || 'member',
            major: user.major,
            badgeNumber: user.badgeNumber,
            pledgeClass: user.pledgeClass,
            status: user.status || 'active',
            phone: user.phone,
            graduationYear: user.graduationYear,
            // Generate a random password that the user will need to reset
            password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
          },
        });
        
        console.log(`Migrated user: ${user.email}`);
      } catch (error) {
        console.error(`Error migrating user ${user.email}:`, error);
      }
    }
    
    console.log('User migration completed');
  } catch (error) {
    console.error('Error during user migration:', error);
  }
}

async function migrateHomePageContent() {
  try {
    console.log('Starting home page content migration...');
    
    // Get Payload client
    const payload = await getPayloadClient();
    
    // Create default home page content
    const homePageContent = {
      title: 'Home Page',
      banner: {
        title: 'THETA TAU',
        subtitle: 'LAMBDA GAMMA CHAPTER',
        location: 'CLEMSON, SC',
      },
      pillars: {
        title: 'THE THREE PILLARS',
        brotherhood: {
          title: 'Brotherhood',
          description: 'We forge lifelong bonds of fraternal friendship, a journey that develops and delivers a network of lasting personal and professional relationships. We foster an inviting, safe, and social environment in which our members become friends for life. We work hard to create a tight knit group of friends we can rely on during each brother\'s college years.',
          events: [
            { name: 'Tailgating' },
            { name: 'Brothers-Only Retreat Weekend' },
            { name: 'Semi/Formal' },
            { name: 'Intramural Sports' },
            { name: 'Big/Little Reveal' },
          ],
        },
        professionalism: {
          title: 'Professionalism',
          description: 'We develop and nurture engineers with strong communication, problem-solving, collaboration, and leadership skills that we demonstrate in our profession, our community, and in our lives. Our professional development events prepare brothers for life after college by giving members the opportunity to network with professionals, improve their resume, and plan for the future.',
          events: [
            { name: 'Resume Workshop' },
            { name: 'Co-Op Panel' },
            { name: 'Building Tours' },
            { name: 'Finals Week Library Camp Out' },
          ],
        },
        service: {
          title: 'Service',
          description: 'We are known for our service to our university and the greater community. Our service projects create an environment for learning and personal growth for our members. We value the community benefits of service, as well as the strong bonds forged by service alongside our brothers.',
          events: [
            { name: 'Habitat for Humanity' },
            { name: 'Adopt-A-Highway' },
            { name: 'Operation Christmas Child' },
          ],
        },
      },
      socialsFooter: {
        title: 'Check out our Social Media!',
        socialLinks: [
          { platform: 'facebook', url: 'https://www.facebook.com/ClemsonThetaTau/' },
          { platform: 'instagram', url: 'https://www.instagram.com/clemsonthetatau' },
          { platform: 'email', url: 'mailto:lambda.gamma@thetatau.org' },
        ],
      },
    };
    
    // Check if home page content already exists
    const existingContent = await payload.find({
      collection: 'home-page-content',
    });
    
    if (existingContent.docs.length > 0) {
      console.log('Home page content already exists, updating...');
      await payload.update({
        collection: 'home-page-content',
        id: existingContent.docs[0].id,
        data: homePageContent,
      });
    } else {
      console.log('Creating new home page content...');
      await payload.create({
        collection: 'home-page-content',
        data: homePageContent,
      });
    }
    
    console.log('Home page content migration completed');
  } catch (error) {
    console.error('Error during home page content migration:', error);
  }
}

async function migrateAboutUsContent() {
  try {
    console.log('Starting about us content migration...');
    
    // Get Payload client
    const payload = await getPayloadClient();
    
    // Create default about us content
    const aboutUsContent = {
      title: 'About Us',
      nationalHistory: {
        title: 'National History',
        content: `
          <p>Theta Tau was originally founded as the Society of Hammer and Tongs on
          October 15, 1904 at the University of Minnesota in Minneapolis by four
          young engineering students Erich J. Schrader, Elwin L. Vinal, William M.
          Lewis, and Isaac B. Hanks. Erich Schrader felt that engineering deserved
          a prominent professional fraternity similar to those that existed for
          lawyers, physicians, and dentists. Schrader's service to the fraternity
          remains unmatched, having served as Grand Regent from 1904 to 1919,
          followed by 35 years as the Grand Scribe.</p>
          
          <p>Fifty years after its founding the Fraternity established the position
          of Counsellor to be held only by Erich Schrader at the Founders' Golden
          Anniversary Convention. He held this position until his death in 1962.
          The remaining founders remained interested in Theta Tau throughout their
          lives until the last brother, Vinal, died in 1971.</p>
          
          <p>Erich Schrader was chiefly responsible for the Ritual, Constitution, and
          the Bylaws adopted by the founders. The first badge was a gold skull
          with the letters Θ and Τ on its forehead and a crossed hammer and tongs
          beneath. Schrader's Constitution allowed for additional chapters at
          other engineering schools, with the hope that the organization would
          take on a national chapter.</p>
          
          <p>The oldest symbol of the fraternity still in use is the coat of arms,
          adopted in 1906, which may only be displayed or worn by members.</p>
          
          <p>Robert Downing, a friend of Isaac Hanks and student at Michigan College
          of Mines worked with Hanks to install the Beta chapter in 1906. In 1907,
          founder William Lewis transferred to the Colorado School of Mines and
          set up the Gamma Chapter in 1907. These three chapters held the first
          national conference in 1911, during which a new ritual was approved, the
          present badge adopted, and the name changed to Theta Tau. It was also
          decided that all branches of engineering would be included.</p>
          
          <p>Over the next several years, new chapters continued to be installed. The
          second conference was held in 2013 and designated The Gear of Theta Tau
          as the fraternity's magazine with Jack E. Haynes as its first
          editor-in-chief.</p>
          
          <p>Despite the toll wars took on numbers, the fraternity continued to grow
          for many years. This growth continued in 1977, when a decision from the
          1976 national conference was implemented granting women membership in
          the fraternity, with the Delta Chapter from Case Western Reserve being
          the first to implement.</p>
          
          <p>By the time Theta Tau celebrated its centennial in 2004, more than
          30,000 members had been initiated. More than 20 new chapters have been
          installed and many more colonies certified since 2010, a testament to
          Theta Tau's record growth in recent history.</p>
        `,
        footer: 'To view more information about the national organization of Theta Tau, please visit thetatau.org',
      },
      chapterHistory: {
        title: 'Chapter History',
        content: `
          <p>The Lambda Gamma chapter of Theta Tau was founded by Scott Kultau, Jason
          Gamble, and Penn Sanders on January 13, 2001. The installment ceremony
          was conducted by the Grand Region at that time, Grand Regent Glen A.
          Wilcox.</p>
          <p>Throughout the years, Lambda Gamma has continued to grow without losing
          the core values of being a brotherhood of Theta Tau.</p>
          <p>The Lambda Gamma chapter of Theta Tau respect the culture of
          brotherhood, lifelong relationships, and connection, mutual respect and
          professionalism, balance of social, service, and professional
          activities, and diversity of engineering disciplines and demographics.</p>
          <p>The oldest symbol of the fraternity still in use is the coat of arms,
          adopted in 1906, which may only be displayed or worn by members.</p>
        `,
      },
      chapterStats: {
        title: 'Members',
        stats: [
          { label: 'Mechanical Engineering', value: '25' },
          { label: 'Bioengineering', value: '25' },
          { label: 'Industrial Engineering', value: '9' },
          { label: 'Chemical Engineering', value: '8' },
          { label: 'General Engineering', value: '6' },
          { label: 'Electrical Engineering', value: '5' },
          { label: 'Civil Engineering', value: '3' },
          { label: 'Biosystems Engineering', value: '2' },
          { label: 'Ceramic and Materials Engineering', value: '2' },
          { label: 'Environmental Systems Engineering', value: '1' },
          { label: 'Computer Engineering', value: '2' },
          { label: 'Computer Science', value: '7' },
        ],
      },
    };
    
    // Check if about us content already exists
    const existingContent = await payload.find({
      collection: 'about-us-content',
    });
    
    if (existingContent.docs.length > 0) {
      console.log('About us content already exists, updating...');
      await payload.update({
        collection: 'about-us-content',
        id: existingContent.docs[0].id,
        data: aboutUsContent,
      });
    } else {
      console.log('Creating new about us content...');
      await payload.create({
        collection: 'about-us-content',
        data: aboutUsContent,
      });
    }
    
    console.log('About us content migration completed');
  } catch (error) {
    console.error('Error during about us content migration:', error);
  }
}

async function migrateCountdownEvents() {
  try {
    console.log('Starting countdown events migration...');
    
    // Get Payload client
    const payload = await getPayloadClient();
    
    // Create default countdown event
    const countdownEvent = {
      name: 'Next Rush Event',
      description: 'Countdown to our next rush event',
      targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      isActive: true,
      displayLocation: 'both',
    };
    
    // Check if countdown events already exist
    const existingEvents = await payload.find({
      collection: 'countdown-events',
    });
    
    if (existingEvents.docs.length > 0) {
      console.log('Countdown events already exist, skipping...');
    } else {
      console.log('Creating new countdown event...');
      await payload.create({
        collection: 'countdown-events',
        data: countdownEvent,
      });
    }
    
    console.log('Countdown events migration completed');
  } catch (error) {
    console.error('Error during countdown events migration:', error);
  }
}

async function migrateBrothers() {
  try {
    console.log('Starting brothers migration...');
    
    // Get Payload client
    const payload = await getPayloadClient();
    
    // Get all users from Firebase
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseUser[];
    
    console.log(`Found ${users.length} users in Firebase to migrate as brothers`);
    
    // Migrate each user to Payload CMS as a brother
    for (const user of users) {
      try {
        // Check if brother already exists in Payload
        const existingBrothers = await payload.find({
          collection: 'brothers',
          where: {
            email: { equals: user.email },
          },
        });
        
        if (existingBrothers.docs.length > 0) {
          console.log(`Brother ${user.email} already exists in Payload CMS, skipping...`);
          continue;
        }
        
        // Find the corresponding user in Payload CMS
        const payloadUsers = await payload.find({
          collection: 'users',
          where: {
            email: { equals: user.email },
          },
        });
        
        let userId = null;
        if (payloadUsers.docs.length > 0) {
          userId = payloadUsers.docs[0].id;
        }
        
        // Create brother in Payload CMS
        const newBrother = await payload.create({
          collection: 'brothers',
          data: {
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            major: user.major,
            badgeNumber: user.badgeNumber,
            pledgeClass: user.pledgeClass,
            graduationYear: user.graduationYear,
            position: user.role === 'web-chair' ? 'web-chair' : 'member',
            status: user.status || 'active',
            email: user.email,
            user: userId,
          },
        });
        
        console.log(`Migrated brother: ${user.email}`);
      } catch (error) {
        console.error(`Error migrating brother ${user.email}:`, error);
      }
    }
    
    console.log('Brothers migration completed');
  } catch (error) {
    console.error('Error during brothers migration:', error);
  }
}

async function runMigration() {
  try {
    console.log('Starting migration from Firebase to Payload CMS...');
    
    // Migrate users first
    await migrateUsers();
    
    // Migrate content
    await migrateHomePageContent();
    await migrateAboutUsContent();
    await migrateCountdownEvents();
    
    // Migrate brothers (depends on users)
    await migrateBrothers();
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
runMigration();
