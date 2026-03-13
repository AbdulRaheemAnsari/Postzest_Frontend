import { useState, useCallback } from 'react';
import { Idea, Column, Tag } from '@/types/idea';

const generateId = () => Math.random().toString(36).substr(2, 9);

const tagColors = [
  'hsl(220, 90%, 56%)', // blue
  'hsl(142, 71%, 45%)', // green
  'hsl(0, 84%, 60%)',   // red
  'hsl(262, 83%, 58%)', // purple
  'hsl(38, 92%, 50%)',  // orange
  'hsl(330, 81%, 60%)', // pink
  'hsl(180, 70%, 45%)', // cyan
];

const initialColumns: Column[] = [
  { id: 'unassigned', title: 'Unassigned', order: 0 },
  { id: 'todo', title: 'To Do', order: 1 },
  { id: 'in-progress', title: 'In Progress', order: 2 },
  { id: 'done', title: 'Done', order: 3 },
];

const initialTags: Tag[] = [];

const initialIdeas: Idea[] = [
  {
    id: '1',
    title: 'This is a place to plan ✍️ your content',
    description: 'Save your Ideas before converting them into posts. Brainstorm, plan ahead, and refine! To find out more check out...',
    columnId: 'unassigned',
    tagIds: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function useIdeaBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [tags, setTags] = useState<Tag[]>(initialTags);

  // Idea CRUD operations
  const createIdea = useCallback((idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIdea: Idea = {
      ...idea,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setIdeas(prev => [...prev, newIdea]);
    return newIdea;
  }, []);

  const updateIdea = useCallback((id: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id 
        ? { ...idea, ...updates, updatedAt: new Date() }
        : idea
    ));
  }, []);

  const deleteIdea = useCallback((id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  }, []);

  const deleteMultipleIdeas = useCallback((ids: string[]) => {
    setIdeas(prev => prev.filter(idea => !ids.includes(idea.id)));
  }, []);

  const duplicateIdea = useCallback((id: string) => {
    const ideaToDuplicate = ideas.find(idea => idea.id === id);
    if (ideaToDuplicate) {
      const newIdea: Idea = {
        ...ideaToDuplicate,
        id: generateId(),
        title: `${ideaToDuplicate.title} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setIdeas(prev => [...prev, newIdea]);
      return newIdea;
    }
    return null;
  }, [ideas]);

  const moveIdea = useCallback((ideaId: string, newColumnId: string) => {
    setIdeas(prev => prev.map(idea =>
      idea.id === ideaId
        ? { ...idea, columnId: newColumnId, updatedAt: new Date() }
        : idea
    ));
  }, []);

  const moveMultipleIdeas = useCallback((ids: string[], newColumnId: string) => {
    setIdeas(prev => prev.map(idea =>
      ids.includes(idea.id)
        ? { ...idea, columnId: newColumnId, updatedAt: new Date() }
        : idea
    ));
  }, []);

  // Column CRUD operations
  const createColumn = useCallback((title: string) => {
    const newColumn: Column = {
      id: generateId(),
      title,
      order: columns.length,
    };
    setColumns(prev => [...prev, newColumn]);
    return newColumn;
  }, [columns.length]);

  const updateColumn = useCallback((id: string, title: string) => {
    setColumns(prev => prev.map(col =>
      col.id === id ? { ...col, title } : col
    ));
  }, []);

  const deleteColumn = useCallback((id: string) => {
    // Move all ideas from deleted column to unassigned
    setIdeas(prev => prev.map(idea =>
      idea.columnId === id ? { ...idea, columnId: 'unassigned' } : idea
    ));
    setColumns(prev => prev.filter(col => col.id !== id));
  }, []);

  const reorderColumns = useCallback((activeId: string, overId: string) => {
    setColumns(prev => {
      const oldIndex = prev.findIndex(col => col.id === activeId);
      const newIndex = prev.findIndex(col => col.id === overId);
      
      if (oldIndex === -1 || newIndex === -1) return prev;
      
      const newColumns = [...prev];
      const [removed] = newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, removed);
      
      return newColumns.map((col, index) => ({ ...col, order: index }));
    });
  }, []);

  const getIdeasByColumn = useCallback((columnId: string) => {
    return ideas.filter(idea => idea.columnId === columnId);
  }, [ideas]);

  const getIdeaCount = useCallback((columnId: string) => {
    return ideas.filter(idea => idea.columnId === columnId).length;
  }, [ideas]);

  // Tag CRUD operations
  const createTag = useCallback((name: string) => {
    const colorIndex = tags.length % tagColors.length;
    const newTag: Tag = {
      id: generateId(),
      name: name.trim(),
      color: tagColors[colorIndex],
    };
    setTags(prev => [...prev, newTag]);
    return newTag;
  }, [tags.length]);

  const deleteTag = useCallback((id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
    // Remove tag from all ideas
    setIdeas(prev => prev.map(idea => ({
      ...idea,
      tagIds: idea.tagIds?.filter(tagId => tagId !== id) || [],
    })));
  }, []);

  const getTagById = useCallback((id: string) => {
    return tags.find(tag => tag.id === id);
  }, [tags]);

  return {
    columns,
    ideas,
    tags,
    createIdea,
    updateIdea,
    deleteIdea,
    deleteMultipleIdeas,
    duplicateIdea,
    moveIdea,
    moveMultipleIdeas,
    createColumn,
    updateColumn,
    deleteColumn,
    reorderColumns,
    getIdeasByColumn,
    getIdeaCount,
    createTag,
    deleteTag,
    getTagById,
  };
}
