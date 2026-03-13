"use client";
import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useIdeaBoard } from '@/hooks/useIdeaBoard';
import { Idea, Column } from '@/types/idea';
import { Plus, Sparkles, Lightbulb, Trash2, X, ArrowRight, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AIGenerateModal } from '@/components/IdeasBoardComponents/AIGenerateModal';
import { NewColumnModal } from '@/components/IdeasBoardComponents/NewColumnModal';
import { NewIdeaModal } from '@/components/IdeasBoardComponents/NewIdeaModal';
import { SortableColumn } from '@/components/IdeasBoardComponents/SortableColumn';
import { DeleteConfirmModal } from '@/components/IdeasBoardComponents/DeleteConfirmModal';
import { toast } from 'react-toastify';

const IdeaBoard = () => {
  const {
    columns,
    ideas,
    tags,
    createIdea,
    updateIdea,
    deleteIdea,
    deleteMultipleIdeas,
    duplicateIdea,
    moveMultipleIdeas,
    moveIdea,
    createColumn,
    updateColumn,
    deleteColumn,
    reorderColumns,
    getIdeasByColumn,
    getIdeaCount,
    createTag,
  } = useIdeaBoard();

  const [newIdeaModalOpen, setNewIdeaModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [newColumnModalOpen, setNewColumnModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('unassigned');
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [activeIdea, setActiveIdea] = useState<Idea | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  
  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeData = active.data.current;

    if (activeData?.type === 'idea') {
      setActiveIdea(activeData.idea);
    } else if (activeData?.type === 'column') {
      setActiveColumn(activeData.column);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'idea') {
      let targetColumnId: string | null = null;

      if (overData?.type === 'idea') {
        const overIdea = ideas.find(i => i.id === over.id);
        if (overIdea) {
          targetColumnId = overIdea.columnId;
        }
      } else if (overData?.type === 'column') {
        targetColumnId = overData.columnId;
      }

      if (targetColumnId && activeData.idea.columnId !== targetColumnId) {
        moveIdea(active.id as string, targetColumnId);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveIdea(null);
    setActiveColumn(null);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'column' && overData?.type === 'column') {
      if (active.id !== over.id) {
        reorderColumns(active.id as string, over.id as string);
      }
    }
  };

  const handleAddIdea = (columnId: string) => {
    setSelectedColumnId(columnId);
    setEditingIdea(null);
    setNewIdeaModalOpen(true);
  };

  const handleEditIdea = (idea: Idea) => {
    setEditingIdea(idea);
    setSelectedColumnId(idea.columnId);
    setNewIdeaModalOpen(true);
  };

  const handleDeleteIdea = (id: string) => {
    deleteIdea(id);
    selectedIds.delete(id);
    setSelectedIds(new Set(selectedIds));
    toast.success('Idea deleted');
  };

  const handleDuplicateIdea = (id: string) => {
    duplicateIdea(id);
    toast.success('Idea duplicated');
  };

  const handleMoveIdea = (id: string, columnId: string) => {
    moveIdea(id, columnId);
    toast.success('Idea moved');
  };

  const handleSelectIdea = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
    
    if (newSelected.size === 0) {
      setSelectionMode(false);
    }
  };

  const handleToggleSelectionMode = (id: string) => {
    setSelectionMode(true);
    setSelectedIds(new Set([id]));
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  const handleDeleteSelected = () => {
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMultipleIdeas(Array.from(selectedIds));
    toast.success(`${selectedIds.size} idea${selectedIds.size > 1 ? 's' : ''} deleted`);
    setSelectedIds(new Set());
    setSelectionMode(false);
    setDeleteConfirmOpen(false);
  };

  const handleBulkMove = (columnId: string) => {
    const count = selectedIds.size;
    moveMultipleIdeas(Array.from(selectedIds), columnId);
    const column = columns.find(c => c.id === columnId);
    toast.success(`${count} idea${count > 1 ? 's' : ''} moved to ${column?.title}`);
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  const handleSaveIdea = (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => {
    createIdea(idea);
    toast.success('Idea created');
  };

  const handleUpdateIdea = (id: string, updates: Partial<Idea>) => {
    updateIdea(id, updates);
    toast.success('Idea updated');
  };

  const handleAIGenerate = (generatedIdeas: { title: string; description: string }[]) => {
    generatedIdeas.forEach((idea) => {
      createIdea({
        title: idea.title,
        description: idea.description,
        columnId: 'unassigned',
      });
    });
    toast.success(`${generatedIdeas.length} ideas added to Unassigned`);
  };

  const handleCreateColumn = (title: string) => {
    createColumn(title);
    toast.success('Group created');
  };

  const handleDeleteColumn = (id: string) => {
    deleteColumn(id);
    toast.success('Group deleted. Ideas moved to Unassigned.');
  };

  const handleRenameColumn = (id: string, title: string) => {
    updateColumn(id, title);
    toast.success('Group renamed');
  };

  const columnIds = columns.map(col => col.id);

  return (
    <div className="h-full flex flex-col ">
      {/* Header */}
      <header className="flex items-center justify-between pb-2 border-b bg-card overflow-x-hidden">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Ideas</h1>
        </div>

        <div className="flex items-center gap-3">
          {selectionMode && selectedIds.size > 0 ? (
            <>
              <Button
                variant="outline"
                onClick={handleClearSelection}
                className="flex items-center justify-center gap-0.5 cursor-pointer rounded-sm py-6 font-semibold"
              >
                Clear Selection
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center justify-center gap-0.5 cursor-pointer rounded-sm py-6 font-semibold">
                    <ArrowRight strokeWidth={3} className="h-4 w-4" />
                    Move to Group
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  {columns.map((column) => (
                    <DropdownMenuItem 
                      key={column.id}
                      onClick={() => handleBulkMove(column.id)}
                    >
                      {column.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                className="flex items-center justify-center gap-1 cursor-pointer rounded-sm py-6 font-semibold"
              >
                <Trash strokeWidth={3} className="h-4 w-4" />
                Delete {selectedIds.size} Idea{selectedIds.size > 1 ? 's' : ''}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setAiModalOpen(true)}
                className="flex items-center justify-center gap-1 cursor-pointer rounded-sm py-6 font-semibold"
              >
                <Sparkles strokeWidth={3} className="h-4 w-4" />
                Generate Ideas
              </Button>
              <Button onClick={() => setNewColumnModalOpen(true)} className="flex items-center justify-center gap-0.5 cursor-pointer rounded-sm py-6 font-semibold">
                <Plus strokeWidth={3} className="h-4 w-4" />
                New Group
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Board */}
      <div className="flex-1 overflow-x-auto w-full py-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 h-[600px]">
            <SortableContext items={columnIds} strategy={horizontalListSortingStrategy}>
              {columns.map((column) => (
                <SortableColumn
                  key={column.id}
                  column={column}
                  columns={columns}
                  tags={tags}
                  ideas={getIdeasByColumn(column.id)}
                  ideaCount={getIdeaCount(column.id)}
                  selectedIds={selectedIds}
                  selectionMode={selectionMode}
                  onAddIdea={handleAddIdea}
                  onEditIdea={handleEditIdea}
                  onDeleteIdea={handleDeleteIdea}
                  onDuplicateIdea={handleDuplicateIdea}
                  onMoveIdea={handleMoveIdea}
                  onSelectIdea={handleSelectIdea}
                  onToggleSelectionMode={handleToggleSelectionMode}
                  onRenameColumn={handleRenameColumn}
                  onDeleteColumn={handleDeleteColumn}
                  isDefaultColumn={column.id === 'unassigned'}
                />
              ))}
            </SortableContext>

            {/* Add New Column Button */}
            <div className="min-w-[300px] max-w-[300px]">
              <Button
                variant="ghost"
                className="w-full h-12 border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/40 text-muted-foreground"
                onClick={() => setNewColumnModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Group
              </Button>
            </div>
          </div>

          <DragOverlay>
            {activeIdea && (
              <div className="idea-card bg-background shadow-xl rotate-3 opacity-90">
                <h4 className="font-medium text-foreground text-sm">{activeIdea.title}</h4>
                {activeIdea.description && (
                  <p className="text-muted-foreground text-xs line-clamp-2 mt-1">
                    {activeIdea.description}
                  </p>
                )}
              </div>
            )}
            {activeColumn && (
              <div className="column-container w-[300px] opacity-90 rotate-2 shadow-xl">
                <h3 className="font-semibold text-sm">{activeColumn.title}</h3>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Modals */}
      <NewIdeaModal
        open={newIdeaModalOpen}
        onOpenChange={setNewIdeaModalOpen}
        columns={columns}
        tags={tags}
        initialColumnId={selectedColumnId}
        editingIdea={editingIdea}
        onSave={handleSaveIdea}
        onUpdate={handleUpdateIdea}
        onCreateTag={createTag}
      />

      <AIGenerateModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        onGenerate={handleAIGenerate}
      />

      <NewColumnModal
        open={newColumnModalOpen}
        onOpenChange={setNewColumnModalOpen}
        onSave={handleCreateColumn}
      />

      <DeleteConfirmModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        count={selectedIds.size}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default IdeaBoard;