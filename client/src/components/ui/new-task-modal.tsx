import { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: any) => void;
  users: Array<{ id: string; name: string; role: string }>;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  users 
}) => {
  const [formData, setFormData] = useState({
    requirement: '',
    branchSpecific: '',
    contentType: '',
    format: '',
    eventBased: '',
    reference: null,
    assigneeId: ''
  });

  const handleSubmit = () => {
    onSubmit({
      title: formData.requirement,
      requirement: formData.requirement,
      branchSpecific: formData.branchSpecific,
      contentType: formData.contentType,
      format: formData.format,
      eventBased: formData.eventBased,
      assigneeId: formData.assigneeId,
      priority: 'medium',
      tags: []
    });
    setFormData({
      requirement: '',
      branchSpecific: '',
      contentType: '',
      format: '',
      eventBased: '',
      reference: null,
      assigneeId: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  const creativeUsers = users.filter(u => u.role === 'creative_team');

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white dark:bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">New task</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Requirement</label>
              <textarea
                placeholder="Write a brief about your requirement"
                className="w-full p-3 border border-border rounded-lg resize-none h-20 text-sm"
                value={formData.requirement}
                onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                data-testid="input-requirement"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Brand Specific ?</label>
              <select 
                className="w-full p-3 border border-border rounded-lg text-sm"
                value={formData.branchSpecific}
                onChange={(e) => setFormData({...formData, branchSpecific: e.target.value})}
                data-testid="select-brand-specific"
              >
                <option value="">Select</option>
                <option value="Bhimavaram">Bhimavaram</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="All Branches">All Branches</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Event/Occasion Based ?</label>
              <select 
                className="w-full p-3 border border-border rounded-lg text-sm"
                value={formData.eventBased}
                onChange={(e) => setFormData({...formData, eventBased: e.target.value})}
                data-testid="select-event-based"
              >
                <option value="">Select</option>
                <option value="Wedding Season">Wedding Season</option>
                <option value="Diwali">Diwali</option>
                <option value="Store Opening">Store Opening</option>
                <option value="Festival">Festival</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Creative/Video</label>
              <select 
                className="w-full p-3 border border-border rounded-lg text-sm"
                value={formData.contentType}
                onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                data-testid="select-content-type"
              >
                <option value="">Select</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="carousel">Carousel</option>
                <option value="text">Text</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Format ( Ratio )</label>
              <select 
                className="w-full p-3 border border-border rounded-lg text-sm"
                value={formData.format}
                onChange={(e) => setFormData({...formData, format: e.target.value})}
                data-testid="select-format"
              >
                <option value="">Select</option>
                <option value="1350 x 1080 PX">1350 x 1080 PX</option>
                <option value="1080 x 1080 PX">1080 x 1080 PX</option>
                <option value="1080 x 1920 PX">1080 x 1920 PX</option>
                <option value="16:9">16:9</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Reference if any?</label>
              <Button 
                variant="outline" 
                className="w-full justify-center"
                data-testid="button-upload-reference"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Assign to:</label>
            <div className="flex items-center space-x-2">
              <select 
                className="p-2 border border-border rounded-lg text-sm"
                value={formData.assigneeId}
                onChange={(e) => setFormData({...formData, assigneeId: e.target.value})}
                data-testid="select-assignee"
              >
                <option value="">Select</option>
                {creativeUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <div className="flex -space-x-2">
                {creativeUsers.slice(0, 4).map((user, index) => (
                  <div 
                    key={user.id} 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                  >
                    {user.name.charAt(0)}
                  </div>
                ))}
                {creativeUsers.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                    +{creativeUsers.length - 4}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-2"
            onClick={handleSubmit}
            disabled={!formData.requirement || !formData.contentType}
            data-testid="button-create-task"
          >
            Create
          </Button>
        </div>
      </Card>
    </div>
  );
};