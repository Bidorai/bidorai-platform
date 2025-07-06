#!/usr/bin/env node

/**
 * Home Page Protection Checker
 * 
 * This script checks if any protected home page files have been modified
 * and warns developers about the frozen design.
 */

const fs = require('fs');
const path = require('path');

const protectedFiles = [
  'app/page.tsx',
  'components/HeroSection.tsx',
  'components/AddressAutocomplete.tsx',
  'components/HowItWorks.tsx',
  'components/FeaturedRestaurants.tsx',
  'components/WhyChoose.tsx',
  'components/Testimonials.tsx',
  'components/CTASection.tsx'
];

const backupDir = 'backup/homepage-frozen';

function checkFileModifications() {
  console.log('🔍 Checking for home page modifications...\n');
  
  let hasModifications = false;
  
  protectedFiles.forEach(file => {
    const currentPath = path.join(__dirname, '..', file);
    const backupPath = path.join(__dirname, '..', backupDir, path.basename(file));
    
    if (fs.existsSync(currentPath) && fs.existsSync(backupPath)) {
      const currentContent = fs.readFileSync(currentPath, 'utf8');
      const backupContent = fs.readFileSync(backupPath, 'utf8');
      
      if (currentContent !== backupContent) {
        console.log(`⚠️  WARNING: ${file} has been modified!`);
        console.log(`   Backup available at: ${backupPath}\n`);
        hasModifications = true;
      }
    }
  });
  
  if (!hasModifications) {
    console.log('✅ All protected home page files are unchanged.');
  } else {
    console.log('🚫 REMINDER: Home page design is FROZEN!');
    console.log('   Please review HOMEPAGE_PROTECTION.md for guidelines.');
  }
}

// Run the check
checkFileModifications(); 