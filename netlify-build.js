#!/usr/bin/env node

// Simple build script for Netlify deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building React app for Netlify...');

// Change to client directory and build
process.chdir('client');
execSync('npx vite build --outDir ../dist', { stdio: 'inherit' });

console.log('Build complete! Files ready for Netlify deployment.');