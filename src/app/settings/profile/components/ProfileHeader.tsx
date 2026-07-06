import type { ProfileUser } from '../types';

interface ProfileHeaderProps {
  user: ProfileUser;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-sm font-semibold text-white">
          {user.initials}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{user.name}</span>
            {user.isActiveNow && (
              <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active now
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{user.jobTitle}</p>
        </div>
      </div>

      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        {user.role}
      </span>
    </div>
  );
}
