'use client';

import { useState, useEffect, useRef } from 'react';
import { LogOut, ChevronDown, User } from 'lucide-react';

interface UserSession {
  name: string;
  email: string;
  role: string;
}

export default function UserDropdown() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch active session user info
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unauthenticated');
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(() => {
        // Safe fallback if fetch fails
        setUser({ name: 'Usuario', email: '', role: 'Usuario' });
      });

    // Click outside handler to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) return null;

  // Get initials (e.g. "Admin Walter" -> "AW")
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name[0] || 'U').toUpperCase();
  };

  return (
    <div className="profile-menu" ref={dropdownRef}>
      <button className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="avatar">{getInitials(user.name)}</div>
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
          <span className="h-title" style={{ fontSize: '12px' }}>{user.name}</span>
          <span className="h-sub" style={{ fontSize: '10px', marginTop: '0px' }}>{user.role}</span>
        </div>
        <ChevronDown size={12} style={{ color: 'var(--text-muted)', marginLeft: '4px' }} />
      </button>

      {isOpen && (
        <div className="profile-dropdown">
          <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-muted)' }}>
            Conectado como <strong style={{ color: 'var(--text)' }}>{user.email}</strong>
          </div>
          <button className="dropdown-item" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', color: 'var(--red)' }}>
            <LogOut size={12} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
