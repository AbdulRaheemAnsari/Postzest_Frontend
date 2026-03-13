import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ 
  open, 
  onOpenChange, 
  count, 
  onConfirm 
}: DeleteConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='rounded-sm'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {count} Idea{count > 1 ? 's' : ''}?</AlertDialogTitle>
          <AlertDialogDescription>
            {count > 1 
              ? `These ${count} ideas will be permanently deleted. This action cannot be undone.`
              : 'This idea will be permanently deleted. This action cannot be undone.'
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='py-6 rounded-sm font-semibold cursor-pointer'>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-background py-6 rounded-sm font-semibold cursor-pointer px-8 hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
