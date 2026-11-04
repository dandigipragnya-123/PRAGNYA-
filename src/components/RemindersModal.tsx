import React, { useState } from 'react';
import { Reminder } from '../types';
import { api } from '../services/api';
import { X, Calendar, Plus, Trash2, Clock, CheckCircle } from 'lucide-react';

interface RemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: Reminder[];
  onRefresh: () => void;
}

export const RemindersModal: React.FC<RemindersModalProps> = ({
  isOpen,
  onClose,
  reminders,
  onRefresh,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    setLoading(true);
    try {
      await api.reminders.create({
        title,
        description,
        due_date: dueDate,
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setShowAddForm(false);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.reminders.delete(id);
      onRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Karnataka Deadlines & Action Reminders</h3>
              <p className="text-xs text-slate-400">Track official dates extracted from documents & schemes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Active Citizen Reminders ({reminders.length})
            </span>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-md transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Cancel' : 'Add Reminder'}</span>
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleCreate} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Reminder Title / ಕಾರ್ಯ ಶೀರ್ಷಿಕೆ
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. BBMP SAS Property Tax Rebate Deadline"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Action Due Date / ಕೊನೆಯ ದಿನಾಂಕ
                </label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Notes / ವಿವರಣೆ
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Pay before date to claim 5% municipal rebate."
                  rows={2}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-1.5 bg-slate-900 text-amber-300 rounded-md text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                {loading ? 'Saving...' : 'Save Reminder'}
              </button>
            </form>
          )}

          {reminders.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No upcoming reminders set. When you analyze a document with deadlines, they will appear here automatically.
            </div>
          ) : (
            <div className="space-y-2.5">
              {reminders.map((rem) => {
                const isOverdue = new Date(rem.due_date) < new Date();
                return (
                  <div
                    key={rem.reminder_id}
                    className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-3.5 h-3.5 ${isOverdue ? 'text-rose-500' : 'text-amber-600'}`} />
                        <h4 className="text-xs font-semibold text-slate-900">{rem.title}</h4>
                      </div>
                      {rem.description && (
                        <p className="text-xs text-slate-600 mt-1">{rem.description}</p>
                      )}
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                        <span>Due:</span>
                        <span className={`font-semibold ${isOverdue ? 'text-rose-600' : 'text-slate-800'}`}>
                          {rem.due_date}
                        </span>
                        {isOverdue && <span className="text-rose-600 font-medium">(Overdue)</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(rem.reminder_id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Delete reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
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
