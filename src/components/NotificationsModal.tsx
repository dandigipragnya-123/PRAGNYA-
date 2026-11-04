import React from 'react';
import { AppNotification } from '../types';
import { api } from '../services/api';
import { X, Bell, ExternalLink, Check, Calendar, FileText, AlertCircle } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onRefresh: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onRefresh,
}) => {
  if (!isOpen) return null;

  const handleMarkAsRead = async (id: string) => {
    try {
      await api.notifications.markRead(id);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-4 h-4 text-teal-600" />;
      case 'deadline':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      case 'advisory':
        return <AlertCircle className="w-4 h-4 text-sky-600" />;
      default:
        return <Bell className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Karnataka Citizen Advisories & Notifications</h3>
              <p className="text-xs text-slate-400">Official updates from state departments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No active notifications. You are up to date.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.notification_id}
                className={`pt-3 first:pt-0 flex items-start gap-3 transition-colors ${
                  !notif.is_read ? 'bg-amber-50/50 p-2 rounded-lg' : ''
                }`}
              >
                <div className="p-2 bg-slate-100 rounded-lg shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold text-slate-900">{notif.title}</h4>
                    <span className="text-[10px] text-slate-500 shrink-0">
                      {new Date(notif.created_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>
                  <div className="mt-2 flex items-center gap-3">
                    {notif.action_url && (
                      <a
                        href={notif.action_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800"
                      >
                        <span>Open Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {!notif.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.notification_id)}
                        className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Mark as read</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
