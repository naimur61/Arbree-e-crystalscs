import type { Metadata } from 'next';
// import SettingsContainer from './settings-container';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Settings | E-Crystal',
  description: 'Manage your E-Crystal settings and preferences.',
};

export default function SettingsPage() {
  redirect('/settings/profile');
}
