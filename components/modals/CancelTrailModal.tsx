import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface CancelTrailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CancelTrailModal = ({ open, onOpenChange }: CancelTrailProps) => {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="max-w-[95vw] sm:max-w-[70vw] md:max-w-lg p-0 gap-0 bg-background max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-4 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold">
            Confirm Trail Cancellation
          </DialogTitle>
          <DialogDescription>
            Please confirm you'd like to cancel your trail.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 mt-8">
          <Button
            onClick={() => onOpenChange(false)}
            variant={"outline"}
            className="py-6 cursor-pointer px-6"
          >
            Do not Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => onOpenChange(false)}
            className="py-6 bg-destructive font-semibold hover:bg-destructive/80 cursor-pointer px-6"
          >
            Cancel My Trail
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelTrailModal;
