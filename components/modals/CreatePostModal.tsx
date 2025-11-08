import { useState } from "react";
import {
  X,
  Image as ImageIcon,
  Hash,
  Bold,
  Italic,
  Smile,
  Calendar,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ImagePreview } from "../common/ImagePreview";
import { ImageEditor } from "../common/ImageEditor";
import { FileUpload } from "../common/FileUpload";
import { DateTimePicker } from "../common/DateTimePicker";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUGGESTED_TAGS = ["Health", "Medical", "Doctor", "Viral", "Socialpost"];

 const CreatePostModal = ({
  open,
  onOpenChange,
}: CreatePostModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [postType, setPostType] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [showScheduler, setShowScheduler] = useState(false);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(
    null
  );
const isOpen = useSelector(
     (state: RootState) => state.postModal.createPostModalOpen
   );


  const hasContent = selectedFiles.length > 0 || caption.trim().length > 0;

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditFile = (index: number) => {
    setEditingImageIndex(index);
  };

  const handleSaveEditedImage = (editedImage: File) => {
    if (editingImageIndex !== null) {
      setSelectedFiles((prev) => {
        const newFiles = [...prev];
        newFiles[editingImageIndex] = editedImage;
        return newFiles;
      });
      setEditingImageIndex(null);
      // toast({
      //   title: "Image updated!",
      //   description: "Your image has been edited successfully.",
      // });
    }
  };

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const handleSchedule = () => {
    setShowScheduler(true);
  };

  const handlePostNow = () => {
    // toast({
    //   title: "Post published!",
    //   description: "Your post has been published successfully.",
    // });
    onOpenChange(false);
  };

  const handleSaveDraft = () => {
    // toast({
    //   title: "Draft saved!",
    //   description: "Your post has been saved as a draft.",
    // });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[1200px] p-0 gap-0 h-[90vh] overflow-y-auto">
        <div className="flex h-full">
          {/* Left Side - Form */}
          <div className="flex-1 overflow-y-auto">
            <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-background z-10">
              <DialogTitle className="text-xl">Create Image Post</DialogTitle>
            </DialogHeader>

            <div className="p-6 space-y-6">
              {/* Select Accounts and Post Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Accounts</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              RM
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">raheelmansari7284</span>
                          <X className="w-4 h-4 ml-auto" />
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account1">
                        raheelmansari7284
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Post Type</Label>
                  <Select value={postType} onValueChange={setPostType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image Post</SelectItem>
                      <SelectItem value="video">Video Post</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Caption */}
              <div className="space-y-2">
                <Label>Add Caption</Label>
                <Textarea
                  placeholder="Add your content here e.g. Caption, description, emoji."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Hash className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-primary"
                  >
                    ✨ Write with AI
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>
                  Add Tags{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  placeholder="Write something..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TAGS.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTagClick(tag)}
                      className={cn(
                        selectedTags.includes(tag) &&
                          "bg-primary text-primary-foreground"
                      )}
                    >
                      + {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              <div className="space-y-2">
                <Label>Add Media</Label>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  selectedFiles={selectedFiles}
                  onRemoveFile={handleRemoveFile}
                  onEditFile={handleEditFile}
                />
              </div>

              {/* Schedule Section */}
              {showScheduler && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label>Schedule Post</Label>
                  <DateTimePicker
                    date={scheduledDate}
                    onDateTimeChange={setScheduledDate}
                  />
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-background border-t p-6 flex items-center justify-between">
              <Button variant="outline" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleSchedule}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Button>
                <Button onClick={handlePostNow}>Post now</Button>
              </div>
            </div>
          </div>

          {/* Right Side - Preview */}
          {hasContent && (
            <ImagePreview caption={caption} images={selectedFiles} />
          )}
        </div>

        {/* Image Editor Modal */}
        {editingImageIndex !== null && (
          <ImageEditor
            open={editingImageIndex !== null}
            onOpenChange={(open) => !open && setEditingImageIndex(null)}
            image={selectedFiles[editingImageIndex]}
            onSave={handleSaveEditedImage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   ImagePlus,
//   X,
//   Calendar,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
// } from "lucide-react";
// import { toast } from "sonner";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import FormattingToolbar from "../common/FormattingToolbar";
// import TagInput from "../common/TagInput";
// import ImageUploadZone from "../common/ImageUploadZone";
// import MediaPreview from "../common/MediaPreview";
// import { closeCreatePostModal } from "@/store/slices/createPostModalSlice";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";

// interface UploadedImage {
//   id: string;
//   url: string;
//   file: File;
// }

// interface SelectedAccount {
//   id: string;
//   username: string;
//   platform: string;
//   avatar?: string;
// }

// export default function CreatePostModal() {
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);
//   const isOpen = useSelector(
//     (state: RootState) => state.postModal.createPostModalOpen
//   );
//   const [selectedAccounts, setSelectedAccounts] = useState<SelectedAccount[]>([
//     { id: "1", username: "@username•social", platform: "instagram" },
//   ]);
//   const [postType, setPostType] = useState("");
//   const [caption, setCaption] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [images, setImages] = useState<UploadedImage[]>([]);

//   const handleImageUpload = (files: FileList | null) => {
//     if (!files) return;

//     const newImages: UploadedImage[] = Array.from(files).map((file) => ({
//       id: Math.random().toString(36).substr(2, 9),
//       url: URL.createObjectURL(file),
//       file,
//     }));

//     setImages((prev) => [...prev, ...newImages]);
//     toast.success(`${files.length} image(s) uploaded`);
//   };

//   const handleRemoveImage = (id: string) => {
//     setImages((prev) => prev.filter((img) => img.id !== id));
//   };

//   const handleRemoveAccount = (id: string) => {
//     setSelectedAccounts((prev) => prev.filter((acc) => acc.id !== id));
//   };

//   const handleAddAccount = () => {
//     toast.info("Add account functionality would be implemented here");
//   };

//   const handleSaveAsDraft = () => {
//     toast.success("Post saved as draft");
//   };

//   const handleSchedule = () => {
//     toast.info("Schedule functionality would be implemented here");
//   };

//   const handlePostNow = () => {
//     if (!caption && images.length === 0) {
//       toast.error("Please add a caption or image");
//       return;
//     }
//     toast.success("Post published successfully!");
//     setOpen(false);
//     // Reset form
//     setCaption("");
//     setImages([]);
//     setTags([]);
//   };

//   const hasContent = caption.trim() || images.length > 0;

//   const wordCount = caption.trim().split(/\s+/).filter(Boolean).length;

//   return (
//     <Dialog open={isOpen} onOpenChange={() => dispatch(closeCreatePostModal())}>
//       <DialogContent
//         className={`p-0 ${hasContent ? "max-w-[900px]" : "max-w-[520px]"}`}
//       >
//         <div className="flex">
//           {/* Left Panel - Form */}
//           <div className={`${hasContent ? "w-[500px]" : "w-full"} p-6`}>
//             <DialogHeader className="mb-5">
//               <DialogTitle className="text-lg font-semibold">
//                 Create Image Post
//               </DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4">
//               {/* Account and Post Type Selection */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium">
//                     Select Accounts
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedAccounts.map((acc) => (
//                       <div
//                         key={acc.id}
//                         className="flex items-center gap-1.5 rounded-md border bg-background px-2 py-1"
//                       >
//                         <Avatar className="h-5 w-5">
//                           <AvatarImage src={acc.avatar} />
//                           <AvatarFallback className="text-xs">
//                             {acc.username.charAt(1).toUpperCase()}
//                           </AvatarFallback>
//                         </Avatar>
//                         <span className="text-xs">{acc.username}</span>
//                         <button
//                           onClick={() => handleRemoveAccount(acc.id)}
//                           className="ml-1 text-muted-foreground hover:text-foreground"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       onClick={handleAddAccount}
//                       className="flex h-7 items-center justify-center rounded-md border border-dashed px-2 text-xs text-muted-foreground hover:border-primary hover:text-primary"
//                     >
//                       + Add
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium">
//                     Post Type
//                   </label>
//                   <Select value={postType} onValueChange={setPostType}>
//                     <SelectTrigger className="h-9">
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="image">Image Post</SelectItem>
//                       <SelectItem value="video">Video Post</SelectItem>
//                       <SelectItem value="carousel">Carousel</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Caption Input */}
//               <div>
//                 <label className="mb-1.5 block text-sm font-medium">
//                   Add Caption
//                 </label>
//                 <div className="relative">
//                   <Textarea
//                     placeholder="Add your content here (e.g. Caption, description, emojis...)"
//                     value={caption}
//                     onChange={(e) => setCaption(e.target.value)}
//                     className="min-h-[100px] resize-none text-sm"
//                     maxLength={800}
//                   />
//                   <div className="absolute bottom-2 right-2">
//                     <span className="text-xs text-muted-foreground">
//                       {wordCount} words/800
//                     </span>
//                   </div>
//                 </div>
//                 <FormattingToolbar />
//               </div>

//               {/* Tags Input */}
//               <TagInput tags={tags} onTagsChange={setTags} />

//               {/* Media Upload */}
//               <ImageUploadZone
//                 images={images}
//                 onImageUpload={handleImageUpload}
//                 onRemoveImage={handleRemoveImage}
//               />

//               {/* Social Media Icons */}
//               <div className="flex items-center gap-2">
//                 <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1DA1F2] text-white hover:opacity-90">
//                   <Twitter className="h-3.5 w-3.5" fill="currentColor" />
//                 </button>
//                 <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-90">
//                   <Facebook className="h-3.5 w-3.5" fill="currentColor" />
//                 </button>
//                 <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-90">
//                   <Linkedin className="h-3.5 w-3.5" fill="currentColor" />
//                 </button>
//                 <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90">
//                   <Instagram className="h-3.5 w-3.5" />
//                 </button>
//               </div>
//             </div>

//             {/* Footer Actions */}
//             <div className="mt-5 flex items-center justify-between border-t pt-4">
//               <Button
//                 variant="ghost"
//                 onClick={handleSaveAsDraft}
//                 className="text-sm"
//               >
//                 Save as Draft
//               </Button>
//               <div className="flex gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={handleSchedule}
//                   className="text-sm"
//                 >
//                   <Calendar className="mr-1.5 h-3.5 w-3.5" />
//                   Schedule
//                 </Button>
//                 <Button onClick={handlePostNow} className="text-sm">
//                   Post now
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Right Panel - Media Preview (only show when there's content) */}
//           {hasContent && (
//             <MediaPreview
//               caption={caption}
//               images={images}
//               account={selectedAccounts[0]?.username || "@username•social"}
//             />
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
