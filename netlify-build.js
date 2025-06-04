#!/usr/bin/env node

// Simple build script for Netlify deployment
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Building React app for Netlify...');

// Change to client directory and build
process.chdir('client');
execSync('npx vite build --outDir ../dist', { stdio: 'inherit' });

console.log('Build complete! Files ready for Netlify deployment.');