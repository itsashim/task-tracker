import { useState } from 'react';
import type { Task, TaskFormData } from './types';
import { useTasks } from './hooks/useTasks';
import { useTaskFilters } from './hooks/useTaskFilters';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';

function App() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const { filters, filteredTasks, updateFilters, clearFilters } = useTaskFilters(tasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleCreateTask = async (formData: TaskFormData) => {
    try {
      await createTask(formData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (id: number, updates: Partial<Task>) => {
    try {
      await updateTask(id, updates);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData: TaskFormData) => {
    if (editingTask) {
      await handleUpdateTask(editingTask.id, formData);
    } else {
      await handleCreateTask(formData);
    }
    setEditingTask(undefined);
    setIsFormOpen(false);
  };

  const handleFormCancel = () => {
    setEditingTask(undefined);
    setIsFormOpen(false);
  };

  const handleFilterChange = (field: keyof typeof filters, value: any) => {
    updateFilters({ [field]: value });
  };

  return (
    <div className="min-h-screen bg-[#180f04]">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-300">Task Tracker</h1>
            <p className="text-gray-400 mt-1">Manage your tasks efficiently</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-md mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Filters */}
        <FilterBar
          status={filters.status}
          search={filters.search}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onStatusChange={(status) => handleFilterChange('status', status)}
          onSearchChange={(search) => handleFilterChange('search', search)}
          onSortChange={(sortBy) => handleFilterChange('sortBy', sortBy)}
          onSortOrderChange={(sortOrder) => handleFilterChange('sortOrder', sortOrder)}
          onClearFilters={clearFilters}
        />

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{tasks.length}</div>
            <div className="text-gray-400 text-sm">Total Tasks</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-gray-400 text-sm">Pending</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-gray-400 text-sm">In Progress</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              {tasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-gray-400 text-sm">Completed</div>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          loading={loading}
        />

        {/* Task Form Modal */}
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isOpen={isFormOpen}
        />
      </div>
    </div>
  );
}

export default App;
