"use client";

import { ChevronDown, Edit, Trash, PlusSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

interface Workspace {
  id: string;
  name: string;
}

interface WorkspaceSwitcherProps {
  workspaces: Workspace[];
  isCollapsed: boolean;
  setIsOpen: boolean;
  currentWorkspaceId: string;
  onSelectWorkspace: (id: string) => void;
  onEditWorkspace: (id: string) => void;
  onDeleteWorkspace: (id: string) => void;
  onCreateWorkspace: () => void;
}

export function WorkspaceSwitcher({
  workspaces,
  isCollapsed,
  setIsOpen,
  currentWorkspaceId,
  onSelectWorkspace,
  onEditWorkspace,
  onDeleteWorkspace,
  onCreateWorkspace,
}: WorkspaceSwitcherProps) {
  const currentWorkspace = workspaces?.find(
    (ws) => ws.id === currentWorkspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`w-full ${isCollapsed
              ? " rounded-xs justify-center py-3"
              : "justify-between py-6"
            } items-center cursor-pointer`}
          aria-label="Select Workspace"
        >
          <span className="flex items-center gap-2">
            <div className="p-1 rounded bg-lime-400 text-foreground font-semibold">
              {currentWorkspace?.name?.charAt(0).toUpperCase() || "W"}
            </div>
            {!isCollapsed && (
              <span className="font-semibold">
                {currentWorkspace?.name || "Fill Allen"}
              </span>
            )}
          </span>
          {!isCollapsed && <ChevronDown className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60">
        {workspaces?.map((ws) => (
          <div
            key={ws?.id}
            className="flex items-center justify-between px-2 py-1 hover:bg-muted rounded"
          >
            <DropdownMenuItem
              className="flex-1 cursor-pointer"
              onSelect={() => onSelectWorkspace(ws.id)}
            >
              {ws?.name || "Finn Allen"}
            </DropdownMenuItem>
            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={() => onEditWorkspace(ws?.id)}
                aria-label={`Edit ${ws?.name || "fake haal"}`}
                className="p-1 hover:text-primary"
                type="button"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDeleteWorkspace(ws?.id)}
                aria-label={`Delete ${ws.name}`}
                className="p-1 hover:text-destructive"
                type="button"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={onCreateWorkspace}
          // @ts-ignore
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <PlusSquare className="h-4 w-4" />
          Create New Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
